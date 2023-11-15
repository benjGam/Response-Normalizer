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
      .join(` ${Configurator.options.queryParamsOptions.joinedBy.trim()} `);
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
      return `${strSequence[0].toUpperCase()}${strSequence
        .slice(1, strSequence.length)
        .toLowerCase()}`;
    }
    if (formattingRule.replaceBy) return formattingRule.replaceBy;
    if (formattingRule.casing == WordCasing.DEFAULT)
      return `${strSequence[0].toUpperCase()}${strSequence
        .slice(1, strSequence.length)
        .toLowerCase()}`;
    else if (formattingRule.casing == WordCasing.LOWERED)
      return strSequence.toLowerCase();
    else return strSequence.toUpperCase();
  }
}
