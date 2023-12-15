import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import ParsedExecContext from '../parsed-execution-context/parsed-exec-context';
import { IGNORE_NORMALIZATION } from 'metadata-decorators/ignore-normalization.decorator';

export default abstract class ReflectorInterceptor implements NestInterceptor {
  protected readonly reflector: Reflector;
  private _parsedContext: ParsedExecContext;
  constructor() {
    this.reflector = new Reflector();
  }

  public abstract intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>>;

  protected get parsedContext(): ParsedExecContext {
    return this._parsedContext;
  }

  protected parseContext(executionContext: ExecutionContext) {
    this._parsedContext = new ParsedExecContext(
      this.reflector,
      executionContext,
    );
  }

  public isHandlerIgnoreNormalization(
    executionContext: ExecutionContext,
  ): boolean {
    return (
      this.reflector.get(
        IGNORE_NORMALIZATION,
        executionContext.getHandler(),
      ) === undefined
    );
  }
}
