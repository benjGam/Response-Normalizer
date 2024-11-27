import { SetMetadata } from '@nestjs/common';
import {
  MessageWrapper,
  QueryParameterFormatRule,
  QueryParameterRule,
} from '../interfaces/';

//Should be rework later.
export class RuleOverrides {
  private static metadataKeys = new Map<string, string>([
    ['CustomMessage', 'RULE_OVERRIDE_CUSTOMMESSAGE'],
    ['QueryParameterFormatRule', 'RULE_OVERRIDE_QUERYPARAMETERFORMATRULE'],
    ['QueryParameterRule', 'RULE_OVERRIDE_QUERYPARAMETERRULE'],
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

  public static QueryParameterRule = (
    mapOfNewQueryParameterRule: Map<string, QueryParameterRule>,
  ) =>
    SetMetadata(
      this.metadataKeys.get('QueryParameterRule'),
      mapOfNewQueryParameterRule,
    );
}
