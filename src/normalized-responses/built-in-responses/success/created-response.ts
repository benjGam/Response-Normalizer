import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from '../../../structure-objects/parsed-exec-context.object';
import NormalizedResponse from '../../normalized-response';

export default class CreatedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message = '::subjectModuleName has been created',
  ) {
    super(parsedExecContextObject, data, message, HttpStatus.CREATED);
  }
}
