import {
  QueryParameterFormatRule,
  NormalizerSettings,
  QueryParameterRule,
} from '../interfaces/settings';

export type SettingsType =
  | NormalizerSettings
  | QueryParameterFormatRule
  | QueryParameterRule;
