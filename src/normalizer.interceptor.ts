import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import CreatedResponse from './normalized-responses/built-in-responses/success/created-response';
import DeletedResponse from './normalized-responses/built-in-responses/success/deleted-response';
import GettedResponse from './normalized-responses/built-in-responses/success/getted-response';
import UpdatedResponse from './normalized-responses/built-in-responses/success/updated-response';
import ReflectorInterceptor from './reflector.interceptor';
import { map } from 'rxjs/operators';
import DataNotFoundExceptionResponse from './normalized-responses/built-in-responses/errors/data-not-found-exception';

@Injectable()
export class NormalizerInterceptor extends ReflectorInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    super.parseContext(context);

    return next
      .handle()
      .pipe(
        map((data) =>
          this.isDataEmpty(data)
            ? this.throwExceptionResponseByHttpMethod(data)
            : this.dispatchSuccessResponseByHttpMethod(data),
        ),
      );
  }

  private isDataEmpty(data: any) {
    return (
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length == 0)
    );
  }

  private dispatchSuccessResponseByHttpMethod(data: any) {
    const parsedExecContextObject = super.parsedContext.toJSON();
    switch (parsedExecContextObject.httpMethod) {
      case 'POST':
        return new CreatedResponse(parsedExecContextObject, data).toJSON();
      case 'GET':
        return new GettedResponse(parsedExecContextObject, data).toJSON();
      case 'PATCH':
        return new UpdatedResponse(parsedExecContextObject, data).toJSON();
      case 'DELETE':
        return new DeletedResponse(parsedExecContextObject, data).toJSON();
      default:
        throw new Error(
          `HTTP Method ${parsedExecContextObject.httpMethod} not implemented`,
        );
    }
  }

  private throwExceptionResponseByHttpMethod(data: any) {
    const parsedExecContextObject = super.parsedContext.toJSON();
    switch (parsedExecContextObject.httpMethod) {
      case 'GET':
        new DataNotFoundExceptionResponse(parsedExecContextObject, data);
      default:
        throw new Error(
          `HTTP Method ${parsedExecContextObject.httpMethod} not implemented`,
        );
    }
  }
}
