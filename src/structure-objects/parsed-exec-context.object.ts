import { PickType } from '@nestjs/swagger';

export class ParsedExecContextObject {
  public logicModuleName: string;
  public handlerModuleName: string;
  public queryParams: Map<string, string>;
  public httpMethod: string;
}

export class SringifiableParsedExecContextObject extends PickType(
  ParsedExecContextObject,
  ['httpMethod'],
) {
  public subjectModuleName: string;
  public stringifiedQueryParams: string;
}
