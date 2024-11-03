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
  private readonly _reflector: Reflector;
  private executionContextParser: ExecutionContextParser;
  private responseBuilder: ResponseBuilder;

  constructor() {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    throw new Error('Method not implemented.');
  }

  public get reflector(): Reflector {
    return this._reflector;
  }
}
