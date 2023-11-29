import ExceptionResponse from '../exception-response';
import { ParsedExecContextObject } from 'structure-objects/parsed-exec-context.object';
import { HttpStatus } from '@nestjs/common';
import { Configurator } from '../../../configuration/configurator';

export default class DataAlreadyRegisteredExceptionResponse extends ExceptionResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
  ) {
    super(
      parsedExecContextObject,
      data,
      Configurator.options.exceptionMessages.alreadyRegistered,
      HttpStatus.CONFLICT,
    );
  }
}
