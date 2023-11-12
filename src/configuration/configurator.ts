import { INestApplication } from '@nestjs/common';
import ResponseNormalizerOptions from './response-normalizer.options';
import { NormalizerInterceptor } from '../normalizer.interceptor';

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
