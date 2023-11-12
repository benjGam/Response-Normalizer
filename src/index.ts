import { NormalizerInterceptor as InternalNormalizerInterceptor } from './normalizer.interceptor';
import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { default as RI } from './reflector.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/response-normalizer.options';
import { INestApplication } from '@nestjs/common';

export const NormalizerInterceptor = InternalNormalizerInterceptor;
export const ExternalService = InternalExternalService;
export const ReflectorInterceptor = RI;

export const init = function (
  nestApp: any,
  options?: ResponseNormalizerOptions,
) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
  new Configurator(nestApp, options);
};

export class Configurator {
  public static options: ResponseNormalizerOptions;

  constructor(nestApp: INestApplication, options?: ResponseNormalizerOptions) {
    if (options === undefined) options = new ResponseNormalizerOptions();
    Configurator.options = options;
    this.init(nestApp);
  }

  private init(nestApp: INestApplication) {
    if (Configurator.options.useNormalizerInterceptor)
      nestApp.useGlobalInterceptors(new NormalizerInterceptor());
  }
}
