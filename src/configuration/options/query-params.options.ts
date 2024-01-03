import FormattingRule from './formatting-rule';

export default class QueryParamsOptions {
  public joinedBy?: string = 'and';
  public formattingRules?: FormattingRule[] = [];
}
