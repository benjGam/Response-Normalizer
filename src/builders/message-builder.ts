import { DetailedContext } from 'interfaces/detailed-context';
import { MessageWrapper } from 'interfaces/settings/message-wrapper';

export class MessageBuilder {
  public buildMessage(context: DetailedContext): string {
    return '';
  }

  // Have to be changed in UML
  private getTemplateMessageFromMethod(context: DetailedContext): string {
    return '';
  }

  private getInterpretableFlags(messageToCheckIn: string): string[] {
    return [];
  }

  // Have to be changed in UML
  private replaceInterpretableFlagsByRealValues(
    interpretableFlags: string[],
    messageToReplaceIn: string,
  ): string {
    return '';
  }
}
