import { DetailedContext } from 'interfaces/detailed-context';
import { MessageBuilder } from './message-builder';
import { Response } from 'interfaces/response';

export class ResponseBuilder {
  private messageBuilder: MessageBuilder;

  constructor() {}

  public buildResponse(context: DetailedContext): Response {
    return null;
  }

  // Have to be changed in UML
  private determineOptionalFields(context: DetailedContext): string[] {
    return [];
  }

  // Have to be changed in UML
  private deleteOptionalFields(
    response: Response,
    optionalFields: string[],
  ): Response {
    return null;
  }
}
