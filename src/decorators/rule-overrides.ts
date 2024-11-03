import { SetMetadata } from '@nestjs/common';
import { MessageWrapper } from 'interfaces/settings/message-wrapper';
import { QueryParameterFormatRule } from 'interfaces/settings/rules/query-parameter-format.rule';

//Should be rework later.
export class RuleOverrides {
  private static metadataKeys = new Map<string, string>([
    ['CustomMessage', 'RULE_OVERRIDE_CUSTOMMESSAGE'],
    ['QueryParameterFormatRule', 'RULE_OVERRIDE_QUERYPARAMETERFORMATRULE'],
  ]);

  public static CustomMessage = (newMessageWrapper: Required<MessageWrapper>) =>
    SetMetadata(this.metadataKeys.get('CustomMessage'), newMessageWrapper);

  public static QueryParameterFormatRule = (
    newQueryParameterFormatRule: Required<QueryParameterFormatRule>,
  ) =>
    SetMetadata(
      this.metadataKeys.get('QueryParameterFormatRule'),
      newQueryParameterFormatRule,
    );
}
