import { RequestMethod } from '@nestjs/common';
import { MessageWrapper } from './message-wrapper';
import { QueryParameterNormalizerSettings } from './query-parameter-normalizer.settings';

export interface NormalizerSettings {
  /**
   * This setting allows package to map
   * which message send depending on request method.
   *
   * default: See `default-response-messages`
   */
  responseMessages?: Map<RequestMethod, MessageWrapper>;
  queryParameterNormalizerSettings?: QueryParameterNormalizerSettings;
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
