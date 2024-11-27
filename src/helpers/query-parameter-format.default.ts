import { QueryParameterFormatRule } from '../interfaces/';

export const defaultQueryParameterFormat: QueryParameterFormatRule = {
  syntax: "(':name': ':value')",
  separator: ', ',
};
