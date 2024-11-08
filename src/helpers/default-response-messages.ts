import { RequestMethod } from '@nestjs/common';
import { MessageWrapper } from '../interfaces/settings/message-wrapper';

export const defaultResponseMessages: Map<RequestMethod, MessageWrapper> =
  new Map<RequestMethod, MessageWrapper>([
    [
      RequestMethod.POST,
      {
        success: ':callSubject has been registered.',
        failure: ':callSubject was already registered.',
      },
    ],
    [
      RequestMethod.GET,
      {
        success: ':callSubject :callQueryParams has been getted.',
        failure: ':callSubject :callQueryParams was not found.',
      },
    ],
    [
      RequestMethod.DELETE,
      {
        success: ':callSubject :callQueryParams has been deleted.',
        failure: ':callSubject :callQueryParams cannot be deleted.',
      },
    ],
    [
      RequestMethod.PATCH,
      {
        success: ':callSubject :callQueryParams has been updated.',
        failure: ':callSubject :callQueryParams was not updated.',
      },
    ],
  ]);
