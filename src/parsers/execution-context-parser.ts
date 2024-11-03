import { ExecutionContext, RequestMethod } from '@nestjs/common';
import { DetailedContext } from 'interfaces/detailed-context';

export class ExecutionContextParser {
  //Have to be rework in UML
  constructor(private _currentContext: ExecutionContext) {}

  //Have to be rework in UML
  public parseContext(): DetailedContext {
    return null;
  }

  public set currentContext(newContext: ExecutionContext) {
    this._currentContext = newContext;
  }

  private getHttpMethod(): RequestMethod {
    return null;
  }

  private getHandlerName(): string {
    return '';
  }

  private normalizeHandlerName(detailedContext: DetailedContext): void {}

  private mapQueryParameters(): Map<string, string> {
    return null;
  }

  //Have to be rework in UML
  private getRuleOverrides(): string[] {
    return [];
  }

  private determineIfRequestFailed(): boolean {
    return true;
  }
}
