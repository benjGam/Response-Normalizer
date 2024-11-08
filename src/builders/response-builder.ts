import { DetailedContext } from '../interfaces/detailed-context';
import { MessageBuilder } from './message-builder';
import { Response } from '../interfaces/response';

export class ResponseBuilder {
  private messageBuilder: MessageBuilder;

  constructor() {}

  public buildResponse(context: DetailedContext): Response {
    return null;
  }

  private determineOptionalFields(context: DetailedContext): string[] {
    return [];
  }

  private deleteOptionalFields(
    response: Response,
    optionalFields: string[],
  ): Response {
    return null;
  }
}
