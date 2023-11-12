import { ExecutionContext } from '@nestjs/common';
import { PickType } from '@nestjs/swagger';

export class ParsedExecContextObject {
  public logicModuleName: string;
  public handlerModuleName: string;
  public queryParams: Map<string, string>;
  public httpMethod: string;
  public baseContext: ExecutionContext;
}

export class StringifiableParsedExecContextObject extends PickType(
  ParsedExecContextObject,
  ['httpMethod'],
) {
  public subjectModuleName: string;
  public stringifiedQueryParams: string;
}
