import { CaseName } from 'string-utils-ts/lib/src';

export interface QueryParameterRule {
  case: CaseName | null;
  replaceBy?: string | null;
}
