import { QueryParameterFormatRule, QueryParameterRule } from './rules';

export interface QueryParameterNormalizerSettings {
  /**
   * This setting allows third-party developer to
   * enable or disable case sensitive detection while
   * `QueryParameterNormalizer` gets `queryParameterRules`.
   *
   * Example:
   *
   * `queryParameterRules` includes a record with ["uuid", {...}]
   * if iterated parameter in normalization process is `UUID` then
   * override will not be apply to iterated parameter.
   *
   * default: false
   */
  isParameterRulesIdentifiersCaseSensitive?: boolean;
  /**
   * This setting allows package to format
   * sub string of query parameters
   * in message field in responses.
   *
   * default: See `default-query-parameter-format`
   */
  formatRule?: QueryParameterFormatRule;
  /**
   * This setting allows third-party developer to
   * replace http param names by others or apply
   * a casing change on http param name.
   *
   * default: none
   */
  parameterRules?: Map<string, QueryParameterRule>;
}
