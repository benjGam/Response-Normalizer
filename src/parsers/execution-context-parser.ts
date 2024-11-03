import { ExecutionContext, RequestMethod } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DetailedContext } from 'interfaces/detailed-context';
import { QueryParameterNormalizer } from 'query-parameter-normalizer';

export class ExecutionContextParser {
  private readonly _reflector: Reflector;
  private queryParameterNormalizer: QueryParameterNormalizer;
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

  private getRuleOverrides(): string[] {
    return [];
  }

  private determineIfRequestFailed(): boolean {
    return true;
  }
}
