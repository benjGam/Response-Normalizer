import { HttpStatus } from '@nestjs/common';
import { NormalizedResponseEntryObject } from 'structure-objects/normalized-response.object';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import NormalizedResponse from 'normalized-responses/normalized-response';

export default class UpdatedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    entryObject: NormalizedResponseEntryObject = {
      message:
        '::subjectModuleName for ::stringifiedQueryParams has been updated',
      statusCode: HttpStatus.OK,
    },
  ) {
    super(parsedExecContextObject, data, entryObject);
  }
}
