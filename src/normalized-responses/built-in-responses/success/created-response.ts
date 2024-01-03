import { HttpStatus } from '@nestjs/common';
import { ParsedExecContextObject } from '../../../structure-objects/parsed-exec-context.object';
import NormalizedResponse from '../../normalized-response';
import { Configurator } from '../../../configuration/configurator';

export default class CreatedResponse extends NormalizedResponse {
  constructor(
    parsedExecContextObject: ParsedExecContextObject,
    data: any | any[],
  ) {
    super(
      parsedExecContextObject,
      data,
      Configurator.options.messages.success.createdMessage,
      HttpStatus.CREATED,
    );
  }
}
