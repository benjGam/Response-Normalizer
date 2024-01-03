import { SetMetadata } from '@nestjs/common';

export const CUSTOM_RESPONSE_MESSAGE = 'CUSTOM_RESPONSE_MESSAGE';
export const CustomResponseMessage = (message: string) =>
  SetMetadata(CUSTOM_RESPONSE_MESSAGE, message);
