import { SetMetadata, Type } from '@nestjs/common';

export const EXTERNAL_INVOKED_SERVICE: Type = null;
export const ExternalService = (externalService: Type) =>
  SetMetadata(EXTERNAL_INVOKED_SERVICE, externalService);
