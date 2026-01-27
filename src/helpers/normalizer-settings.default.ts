import { NormalizerSettings } from '../interfaces/';
import {
  defaultResponseMessages,
  defaultQueryParameterNormalizerSettings,
} from '.';

export const defaultNormalizerSettings: NormalizerSettings = {
  responseMessages: defaultResponseMessages,
  queryParameterNormalizerSettings: defaultQueryParameterNormalizerSettings,
  includeStatusCode: true,
  debugMode: false,
  useBuiltInExceptionFilter: true,
};
