import { SetMetadata } from '@nestjs/common';

export const DO_NOT_THROW_ON_EMPTY = true;
export const DoNotThrowOnEmpty = () => SetMetadata(DO_NOT_THROW_ON_EMPTY, true);
