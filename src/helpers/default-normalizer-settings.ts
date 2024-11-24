import { NormalizerSettings } from '../interfaces/settings/normalizer-settings';
import { defaultQueryParameterFormat } from './default-query-parameter-format';
import { defaultResponseMessages } from './default-response-messages';

export const defaultNormalizerSettings: NormalizerSettings = {
  responseMessages: defaultResponseMessages,
  queryParameterFormatRule: defaultQueryParameterFormat,
  includeStatusCode: true,
  debugMode: false,
};
