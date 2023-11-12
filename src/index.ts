import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/response-normalizer.options';
import { INestApplication } from '@nestjs/common';
import { NormalizerInterceptor } from 'normalizer.interceptor';

export const ExternalService = InternalExternalService;

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
