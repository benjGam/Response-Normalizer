import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EXTERNAL_INVOKED_SERVICE } from '../metadata-decorators/external-service.decorator';
import { ParsedExecContextObject } from '../structure-objects/parsed-exec-context.object';
import { Configurator } from '../configuration/configurator';
import { IGNORING_RULES } from '../metadata-decorators/ignore-formatting-rules.decorator';
import { DO_NOT_THROW_ON_EMPTY } from '../metadata-decorators/do-not-throw-on-empty';

export default class ParsedExecContext {
  private readonly structureObject: ParsedExecContextObject;

  constructor(
    private readonly reflector: Reflector,
    private readonly executionContext: ExecutionContext,
  ) {
    this.structureObject = {
      logicModuleName: this.parseLogicModuleName(reflector),
      handlerModuleName: this.parseHandlerModuleName(),
      queryParams: this.parseHttpQueryParamsToMap(),
      httpMethod: this.getHttpMethod(),
      baseContext: executionContext,
      ignoredRules: this.isIgnoringRules(reflector)
        ? this.getIgnoringRules(reflector)
        : [],
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

  private isIgnoringRules(reflector: Reflector): boolean {
    return (
      reflector.get(IGNORING_RULES, this.executionContext.getHandler()) !==
      undefined
    );
  }

  private getIgnoringRules(reflector: Reflector) {
    const ignoringRules = reflector.get(
      IGNORING_RULES,
      this.executionContext.getHandler(),
    );

    return ignoringRules.length == 0
      ? Configurator.options.queryParamsOptions.formattingRules.map(
          (rule) => rule.subStringSequence,
        )
      : ignoringRules;
  }

  public hasToThrowOnEmpty(): boolean {
    return !!!this.reflector.get(
      DO_NOT_THROW_ON_EMPTY,
      this.executionContext.getHandler(),
    );
  }

  public toJSON(): ParsedExecContextObject {
    return this.structureObject;
  }
}
