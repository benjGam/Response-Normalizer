import { DetailedContext, QueryParameterRule } from './interfaces/';

export class QueryParameterNormalizer {
  public normalize(context: DetailedContext): void {}

  private getOverride(
    context: DetailedContext,
  ): Map<string, QueryParameterRule> {
    return new Map<string, QueryParameterRule>();
  }

  private mergeOverrideWithRules(
    overrides: Map<string, QueryParameterRule>,
  ): Map<string, QueryParameterRule> {
    return new Map<string, QueryParameterRule>();
  }

  private getRule(queryParameterName: string): QueryParameterRule {
    return null;
  }

  private applyRule(
    queryParameterName: string,
    rule: QueryParameterRule,
  ): void {}
}
