import { NormalizedResponseEntryObject } from 'structure-objects/normalized-response.object';
import ExceptionResponse from '../exception-response';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { HttpStatus } from '@nestjs/common';

export default class DataNotFoundExceptionResponse extends ExceptionResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    entryObject: NormalizedResponseEntryObject = {
      message: 'No ::subjectModuleName found for ::stringifiedQueryParams',
      statusCode: HttpStatus.NOT_FOUND,
    },
  ) {
    super(parsedExecContextObject, data, entryObject);
  }
}
