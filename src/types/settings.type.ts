import { QueryParameterFormatRule } from '../interfaces/settings/rules/query-parameter-format.rule';
import { NormalizerSettings } from '../interfaces/settings/normalizer-settings';
import { QueryParameterRule } from '../interfaces/settings/rules/query-parameter.rule';

export type SettingsType =
  | NormalizerSettings
  | QueryParameterFormatRule
  | QueryParameterRule;
