import ExceptionResponse from '../exception-response';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { HttpStatus } from '@nestjs/common';
import { Configurator } from '../../../configuration/configurator';

export default class DataNotFoundExceptionResponse extends ExceptionResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
  ) {
    super(
      parsedExecContextObject,
      data,
      Configurator.options.messages.errors.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
