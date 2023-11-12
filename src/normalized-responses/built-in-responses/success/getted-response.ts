import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from '../../../structure-objects/parsed-exec-context.object';
import NormalizedResponse from '../../normalized-response';

export default class GettedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
    message = '::subjectModuleName for ::stringifiedQueryParams has been getted',
  ) {
    super(parsedExecContextObject, data, message, HttpStatus.OK);
  }
}
