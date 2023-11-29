import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { catchError } from 'rxjs/operators';
import DataAlreadyRegisteredExceptionResponse from '../normalized-responses/built-in-responses/errors/data-already-registered-exception';
import DataNotFoundExceptionResponse from '../normalized-responses/built-in-responses/errors/data-not-found-exception';
import ReflectorInterceptor from '../interceptors/reflector.interceptor';

@Injectable()
export class PrismaExceptionInterceptor extends ReflectorInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    super.parseContext(context);

    return next.handle().pipe(catchError((err) => this.manageError(err)));
  }

  private async manageError(error: Error) {
    if (this.isPrismaError(error))
      this.throwExceptionResponse(error as PrismaClientKnownRequestError);
    else throw error;
  }

  private isPrismaError(error: Error) {
    return error instanceof PrismaClientKnownRequestError;
  }

  private throwExceptionResponse(error: PrismaClientKnownRequestError) {
    const parsedExecContextObject = super.parsedContext.toJSON();
    switch (error.code) {
      case 'P2025':
        new DataNotFoundExceptionResponse(parsedExecContextObject, null);
        break;
      case 'P2002':
        new DataAlreadyRegisteredExceptionResponse(
          parsedExecContextObject,
          null,
        );
      default:
        return error;
    }
  }
}
