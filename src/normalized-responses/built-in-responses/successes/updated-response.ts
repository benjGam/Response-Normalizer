import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from '../../../structure-objects/parsed-exec-context.object';
import NormalizedResponse from '../../normalized-response';

export default class UpdatedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message = '::subjectModuleName for ::stringifiedQueryParams has been updated',
  ) {
    super(parsedExecContextObject, data, message, HttpStatus.OK);
  }
}
