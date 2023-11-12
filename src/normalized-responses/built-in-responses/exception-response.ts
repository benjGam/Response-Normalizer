import { HttpException, HttpStatus } from '@nestjs/common';
import NormalizedResponse from '../../normalized-responses/normalized-response';
import { ParsedExecContextObject } from '../../structure-objects/parsed-exec-context.object';

export default abstract class ExceptionResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message: string,
    statusCode: HttpStatus,
  ) {
    super(parsedExecContextObject, data, message, statusCode);
    this.throw();
  }

  private throw() {
    throw new HttpException(
      this.normalizedResponseObject.message,
      this.normalizedResponseObject.statusCode,
    );
  }
}
