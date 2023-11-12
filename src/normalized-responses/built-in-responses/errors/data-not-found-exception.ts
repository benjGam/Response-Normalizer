import ExceptionResponse from '../exception-response';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { HttpStatus } from '@nestjs/common';

export default class DataNotFoundExceptionResponse extends ExceptionResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message = 'No ::subjectModuleName found for ::stringifiedQueryParams',
  ) {
    super(parsedExecContextObject, data, message, HttpStatus.NOT_FOUND);
  }
}
