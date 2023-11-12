import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      response.status(status).json({
        message: (exception.getResponse() as any).message,
        statusCode: status,
      });
    } else {
      response.status(status).json({
        message: exception.message,
        statusCode: status,
      });
    }
  }
}
