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

  private async manageError(err: Error) {
    if (this.isPrismaError(err))
      this.dispatchError(err as PrismaClientKnownRequestError);
    else throw err;
  }

  private isPrismaError(err: Error) {
    return err instanceof PrismaClientKnownRequestError;
  }

  private dispatchError(err: PrismaClientKnownRequestError) {
    const parsedExecContextObject = super.parsedContext.toJSON();
    switch (err.code) {
      case 'P2025':
        new DataNotFoundExceptionResponse(parsedExecContextObject, null);
        break;
      case 'P2002':
        new DataAlreadyRegisteredExceptionResponse(
          parsedExecContextObject,
          null,
        );
      default:
        return err;
    }
  }
}
