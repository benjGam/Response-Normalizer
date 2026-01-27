import { DetailedContext, Response } from '../interfaces/';
import { MessageBuilder } from './';

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
