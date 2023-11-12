import { HttpException } from '@nestjs/common';
import NormalizedResponse from '../../normalized-responses/normalized-response';
import { NormalizedResponseEntryObject } from '../../structure-objects/normalized-response.object';
import { ParsedExecContextObject } from '../../structure-objects/parsed-exec-context.object';

export default abstract class ExceptionResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    entryObject: NormalizedResponseEntryObject,
  ) {
    super(parsedExecContextObject, null, entryObject);
    this.throw();
  }

  private throw() {
    throw new HttpException(
      this.normalizedResponseObject.message,
      this.normalizedResponseObject.statusCode,
    );
  }
}
