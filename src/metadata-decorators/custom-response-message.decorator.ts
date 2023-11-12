import { SetMetadata } from '@nestjs/common';

export const CUSTOM_RESPONSE_MESSAGE = 'CUSTOM_RESPONSE_MESSAGE';
export const ExternalService = (message: string) =>
  SetMetadata(CUSTOM_RESPONSE_MESSAGE, message);
