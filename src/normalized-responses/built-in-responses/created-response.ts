import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { NormalizedResponseEntryObject } from 'structure-objects/normalized-response.object';
import NormalizedResponse from '../normalized-response';

export default class CreatedResponse extends NormalizedResponse {
  constructor(
    parsedExecContext: ParsedExecContextObject,
    data: any | any[],
    entryObject: NormalizedResponseEntryObject = {
      message: '::subjectModuleName has been created',
      statusCode: HttpStatus.CREATED,
    },
  ) {
    super(parsedExecContext, data, entryObject);
  }
}
