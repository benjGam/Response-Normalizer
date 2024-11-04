import { DetailedContext } from 'interfaces/detailed-context';
import { QueryParameterRule } from 'interfaces/settings/rules/query-parameter.rule';

export class QueryParameterNormalizer {
  public normalize(context: DetailedContext): void {}

  private getOverride(
    context: DetailedContext,
  ): Map<string, QueryParameterRule> {
    return new Map<string, QueryParameterRule>();
  }

  //Have to be rework in UML
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
