import { CallHandler, ExecutionContext } from '@nestjs/common';

export type PrismaExceptionInterceptor = {
  intercept(context: ExecutionContext, next: CallHandler);
  manageError(error: Error);
  isPrismaError(error: Error);
  throwExceptionResponse(error: unknown);
};
