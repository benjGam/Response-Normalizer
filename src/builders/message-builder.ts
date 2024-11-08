import { DetailedContext } from '../interfaces/detailed-context';

export class MessageBuilder {
  public buildMessage(context: DetailedContext): string {
    return '';
  }

  private getOverride(context: DetailedContext): string {
    return '';
  }

  private getTemplateMessageFromMethod(context: DetailedContext): string {
    return '';
  }

  private getInterpretableFlags(messageToCheckIn: string): string[] {
    return [];
  }

  private replaceInterpretableFlagsByRealValues(
    interpretableFlags: string[],
    messageToReplaceIn: string,
  ): string {
    return '';
  }
}
