import {
  ParsedExecContextObject,
  StringifiableParsedExecContextObject,
} from '../structure-objects/parsed-exec-context.object';
import { NormalizedResponseObject } from '../structure-objects/normalized-response.object';
import { MessageInterpretor } from '../helpers/message-interpretor';
import ParsedExecContextObjectAdapter from '../parsed-execution-context/parsed-exec-context-object-adapter';
import { HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CUSTOM_RESPONSE_MESSAGE } from '../metadata-decorators/custom-response-message.decorator';

export default abstract class NormalizedResponse {
  protected readonly normalizedResponseObject: NormalizedResponseObject;
  protected readonly stringifiableExecContextObject: StringifiableParsedExecContextObject;

  constructor(
    protected readonly parsedContextObject: ParsedExecContextObject,
    data: any | any[],
    message: string,
    statusCode: HttpStatus,
  ) {
    const reflector = new Reflector();
    if (this.hasCustomMessage(reflector))
      message = this.getCustomMessage(reflector);

    this.stringifiableExecContextObject = new ParsedExecContextObjectAdapter(
      parsedContextObject,
      data,
    ).adaptedObject;

    this.normalizedResponseObject = {
      data,
      message: MessageInterpretor.getInterpretedMessage(
        message,
        this.stringifiableExecContextObject,
      ),
      statusCode,
    };
  }

  private hasCustomMessage(reflector: Reflector) {
    return reflector.get<string>(
      CUSTOM_RESPONSE_MESSAGE,
      this.parsedContextObject.baseContext.getHandler(),
    );
  }

  private getCustomMessage(reflector: Reflector) {
    return reflector.get<string>(
      CUSTOM_RESPONSE_MESSAGE,
      this.parsedContextObject.baseContext.getHandler(),
    );
  }

  public toJSON(): NormalizedResponseObject {
    return this.normalizedResponseObject;
  }
}
