import { QueryParameterFormatRule } from '../interfaces/settings/rules/query-parameter-format.rule';

export const defaultQueryParameterFormat: QueryParameterFormatRule = {
  syntax: "(':name': ':value')",
  separator: ', ',
};
