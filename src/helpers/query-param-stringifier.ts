import { WordCasing } from '../configuration/word-casing';
import { Configurator } from '../configuration/configurator';
import StringFormatter from 'string-utils-ts';

export default class QueryParamStringifier {
  public static stringifyQueryParams(queryParams: Map<string, string>) {
    return Array.from(queryParams.keys())
      .map(
        (key) =>
          `'${queryParams.get(key)}' ${this.stringifyQueryParamKey(key)}`,
      )
      .join(Configurator.options.queryParamsOptions.joinedBy);
  }

  private static stringifyQueryParamKey(key: string) {
    return StringFormatter.splitByCasing(key)
      .map((subSequence) =>
        this.getFormattingRuleForStringSequence(subSequence),
      )
      .join(' ');
  }

  private static getFormattingRuleForStringSequence(strSequence: string) {
    const formattingRule =
      Configurator.options.queryParamsOptions.formattingRules.find(
        (item) =>
          item.subStringSequence.toLowerCase() == strSequence.toLowerCase(),
      );
    if (!formattingRule) {
      return this.formatAsDefaultCasing(strSequence);
    }
    if (formattingRule.replaceBy) return formattingRule.replaceBy;
    if (formattingRule.casing == WordCasing.DEFAULT)
      return this.formatAsDefaultCasing(strSequence);
    else if (formattingRule.casing == WordCasing.LOWERED)
      return strSequence.toLowerCase();
    else return strSequence.toUpperCase();
  }

  private static formatAsDefaultCasing(subQueryParamStrSequence: string) {
    return `${subQueryParamStrSequence[0].toUpperCase()}${subQueryParamStrSequence
      .slice(1, subQueryParamStrSequence.length)
      .toLowerCase()}`;
  }
}
