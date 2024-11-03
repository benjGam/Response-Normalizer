import { SetMetadata } from '@nestjs/common';
import { MessageWrapper } from 'interfaces/settings/message-wrapper';

//Should be rework later.
export class RuleOverrides {
  private static metadataKeys = new Map<string, string>([
    ['CustomMessage', 'RULE_OVERRIDE_CUSTOMMESSAGE'],
  ]);

  public static CustomMessage = (newMessageWrapper: Required<MessageWrapper>) =>
    SetMetadata(this.metadataKeys.get('CustomMessage'), newMessageWrapper);
}
