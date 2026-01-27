import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseBuilder } from '../builders/';
import { ExecutionContextParser } from '../parsers/';
import { Observable } from 'rxjs';

@Injectable()
export class NormalizerInterceptor implements NestInterceptor {
  private executionContextParser: ExecutionContextParser;
  private responseBuilder: ResponseBuilder;

  constructor() {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    throw new Error('Method not implemented.');
  }
}
