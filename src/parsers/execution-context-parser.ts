import { ExecutionContext, RequestMethod } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DetailedContext } from '../interfaces/';
import { QueryParameterNormalizer } from '../query-parameter-normalizer';

export class ExecutionContextParser {
  private readonly reflector: Reflector;
  private readonly queryParameterNormalizer: QueryParameterNormalizer;
  private currentContext: ExecutionContext;

  constructor() {}

  public parseContext(contextToParse: ExecutionContext): DetailedContext {
    return null;
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

  private getRuleOverrides(): Map<string, any> {
    return new Map<string, any>();
  }

  private determineIfRequestFailed(): boolean {
    return true;
  }
}
