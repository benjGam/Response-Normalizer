import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ResponseBuilder } from 'builders/response-builder';
import { ExecutionContextParser } from 'parsers/execution-context-parser';
import { Observable } from 'rxjs';

@Injectable()
export class NormalizerInterceptor implements NestInterceptor {
  //Have to be rework in UML
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
