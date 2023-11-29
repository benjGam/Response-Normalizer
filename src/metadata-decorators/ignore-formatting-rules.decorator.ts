import { SetMetadata } from '@nestjs/common';

export const IGNORING_RULES = 'IGNORING_RULES';
export const IgnoreFormattingRules = (rules: string[] = []) =>
  SetMetadata(IGNORING_RULES, rules);
