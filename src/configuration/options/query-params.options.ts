import FormattingRule from './formatting-rule.options';

export default class QueryParamsOptions {
  public joinedBy?: string = 'and';
  public formattingRules?: FormattingRule[] = [];
}
