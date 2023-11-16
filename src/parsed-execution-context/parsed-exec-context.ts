import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EXTERNAL_INVOKED_SERVICE } from '../metadata-decorators/external-service.decorator';
import { ParsedExecContextObject } from '../structure-objects/parsed-exec-context.object';
import { Configurator } from 'configuration/configurator';
import InvokedServiceHooker from 'experimental/invoked-service-hooker';

export default class ParsedExecContext {
  private readonly structureObject: ParsedExecContextObject;

  constructor(
    reflector: Reflector,
    private readonly executionContext: ExecutionContext,
  ) {
    this.structureObject = {
      logicModuleName: Configurator.options.experimental
        ? InvokedServiceHooker.resolveService(
            executionContext.getClass(),
            executionContext.getHandler(),
          )
        : this.parseLogicModuleName(reflector),
      handlerModuleName: this.parseHandlerModuleName(),
      queryParams: this.parseHttpQueryParamsToMap(),
      httpMethod: this.getHttpMethod(),
      baseContext: executionContext,
    };
  }

  private getHttpMethod() {
    return this.executionContext.switchToHttp().getRequest().method;
  }

  private extractHttpQueryParams() {
    return this.executionContext.getArgs()[0].params;
  }

  private parseHttpQueryParamsToMap() {
    return new Map<string, string>(
      Object.entries(this.extractHttpQueryParams()),
    );
  }

  private parseLogicModuleName(reflector: Reflector) {
    const invokedServiceName = this.getLogicServiceName(reflector);
    return invokedServiceName
      .replace(/service/gim, '')
      .replace(/controller/gim, '');
  }

  private isLogicExternalyManaged(reflector: Reflector) {
    return (
      reflector.get(
        EXTERNAL_INVOKED_SERVICE,
        this.executionContext.getHandler(),
      ) !== undefined
    );
  }

  private getLogicServiceName(reflector: Reflector): string {
    return this.isLogicExternalyManaged(reflector)
      ? reflector.get(
          EXTERNAL_INVOKED_SERVICE,
          this.executionContext.getHandler(),
        ).name
      : this.executionContext.getClass().name;
  }

  private parseHandlerModuleName() {
    return this.executionContext.getClass().name.replace(/controller/gim, '');
  }

  public toJSON(): ParsedExecContextObject {
    return this.structureObject;
  }
}
