import {
  ParsedExecContextObject,
  StringifiableParsedExecContextObject,
} from '../structure-objects/parsed-exec-context.object';
import { NormalizedResponseObject } from '../structure-objects/normalized-response.object';
import { MessageInterpretor } from '../helpers/message-interpretor';
import ParsedExecContextObjectAdapter from '../parsed-execution-context/parsed-exec-context-object-adapter';
import { HttpStatus } from '@nestjs/common';

export default abstract class NormalizedResponse {
  protected readonly normalizedResponseObject: NormalizedResponseObject;
  protected readonly stringifiableExecContextObject: StringifiableParsedExecContextObject;

  constructor(
    parsedContextObject: ParsedExecContextObject,
    data: any | any[],
    message: string,
    statusCode: HttpStatus,
  ) {
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

  public toJSON(): NormalizedResponseObject {
    return this.normalizedResponseObject;
  }
}
