import { WordCasing } from '../configuration/word-casing';
import { Configurator } from '../configuration/configurator';
import StringFormatter from 'string-utils-ts';

export default class QueryParamStringifier {
  public static stringifyQueryParams(
    queryParams: Map<string, string>,
    ignoredRules: string[],
  ) {
    return Array.from(queryParams.keys())
      .map(
        (key) =>
          `'${queryParams.get(key)}' ${
            ignoredRules.find((rule) => rule.toLowerCase() == key.toLowerCase())
              ? key
              : this.stringifyQueryParamKey(key)
          }`,
      )
      .join(Configurator.options.queryParamsOptions.joinedBy);
  }

  private static stringifyQueryParamKey(key: string) {
    return StringFormatter.splitByCasing(key)
      .map((subSequence) => this.formatAsDescribedByRule(subSequence))
      .join(' ');
  }

  private static formatAsDescribedByRule(subQueryParamStrSequence: string) {
    const formattingRule = this.getFormattingRuleForStringSequence(
      subQueryParamStrSequence,
    );

    if (!formattingRule || formattingRule.casing == WordCasing.DEFAULT) {
      return this.formatAsDefaultCasing(subQueryParamStrSequence);
    }

    if (formattingRule.replaceBy) return formattingRule.replaceBy;

    return this.formatAsOtherCasing(
      subQueryParamStrSequence,
      formattingRule.casing,
    );
  }

  private static getFormattingRuleForStringSequence(strSequence: string) {
    return Configurator.options.queryParamsOptions.formattingRules.find(
      (item) =>
        item.subStringSequence.toLowerCase() == strSequence.toLowerCase(),
    );
  }

  private static formatAsDefaultCasing(subQueryParamStrSequence: string) {
    return `${subQueryParamStrSequence[0].toUpperCase()}${subQueryParamStrSequence
      .slice(1, subQueryParamStrSequence.length)
      .toLowerCase()}`;
  }

  private static formatAsOtherCasing(
    subQueryParamStrSequence: string,
    casing: WordCasing,
  ) {
    return casing == WordCasing.LOWERED
      ? subQueryParamStrSequence.toLowerCase()
      : subQueryParamStrSequence.toUpperCase();
  }
}
