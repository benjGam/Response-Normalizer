import { CaseName } from 'string-utils-ts';

export interface QueryParameterRule {
  case: CaseName | null;
  replaceBy?: string | null;
}
