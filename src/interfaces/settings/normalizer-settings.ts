import { RequestMethod } from '@nestjs/common';
import { MessageWrapper } from './message-wrapper';
import { QueryParameterFormatRule } from './rules/query-parameter-format.rule';
import { QueryParameterRule } from './rules/query-parameter.rule';

export interface NormalizerSettings {
  /**
   * This setting allows package to map
   * which message send depending on request method.
   *
   * default: See `default-response-messages`
   */
  responseMessages?: Map<RequestMethod, MessageWrapper>;
  /**
   * This setting allows package to format
   * sub string of query parameters
   * in message field in responses.
   *
   * default: See `default-query-parameter-format`
   */
  queryParameterFormatRule?: QueryParameterFormatRule;
  /**
   * This setting allows third-party developer to
   * replace http param names by others or apply
   * a casing change on http param name.
   *
   * default: none
   */
  queryParameterRules?: Map<string, QueryParameterRule>;
  /**
   * This setting add `statusCode` field in normalized responses.
   *
   * default: true
   */
  includeStatusCode?: boolean;
  /**
   * This setting can be useful in developpement phase.
   *
   * default: false
   */
  debugMode?: boolean;
  /**
   * This setting allows package to manage properly Http exceptions
   * turning it off could result in lack of responses reliability
   * (normalizer process will not be applied on responses where Http exception occured).
   *
   * default: true
   */
  useBuiltInExceptionFilter?: boolean;
}
