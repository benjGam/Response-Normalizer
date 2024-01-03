import { SetMetadata } from '@nestjs/common';

export const IGNORE_NORMALIZATION = true;
export const IgnoreNormalization = () =>
  SetMetadata(IGNORE_NORMALIZATION, true);
