import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { NormalizedResponseEntryObject } from 'structure-objects/normalized-response.object';
import NormalizedResponse from '../normalized-response';

export default class DeletedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    entryObject: NormalizedResponseEntryObject = {
      message:
        '::subjectModuleName has been deleted for ::stringifiedQueryParams',
      statusCode: HttpStatus.OK,
    },
  ) {
    super(parsedExecContextObject, data, entryObject);
  }
}
