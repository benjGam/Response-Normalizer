import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from '../../../structure-objects/parsed-exec-context.object';
import NormalizedResponse from '../../normalized-response';

export default class DeletedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message = '::subjectModuleName has been deleted for ::stringifiedQueryParams',
  ) {
    super(parsedExecContextObject, data, message, HttpStatus.OK);
  }
}
