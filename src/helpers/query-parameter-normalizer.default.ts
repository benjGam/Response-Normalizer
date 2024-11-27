import { QueryParameterNormalizerSettings } from '../interfaces/';
import { defaultQueryParameterFormat } from './';

export const defaultQueryParameterNormalizerSettings: QueryParameterNormalizerSettings =
  {
    isParameterRulesIdentifiersCaseSensitive: false,
    formatRule: defaultQueryParameterFormat,
  };
