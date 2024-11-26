import { RequestMethod } from '@nestjs/common';
import { MessageWrapper } from './message-wrapper';
import { QueryParameterFormatRule } from './rules/query-parameter-format.rule';
import { QueryParameterRule } from './rules/query-parameter.rule';

export interface NormalizerSettings {
  responseMessages?: Map<RequestMethod, MessageWrapper>;
  queryParameterFormatRule?: QueryParameterFormatRule;
  queryParameterRules?: Map<string, QueryParameterRule>;
  includeStatusCode?: boolean;
  debugMode?: boolean;
  useBuiltInExceptionFilter?: boolean;
}
