import { INestApplication } from '@nestjs/common';
import ResponseNormalizerOptions from './response-normalizer.options';
import { NormalizerInterceptor } from '../normalizer.interceptor';

export class Configurator {
  public static options: ResponseNormalizerOptions;

  constructor(nestApp: INestApplication, options?: ResponseNormalizerOptions) {
    Configurator.options =
      options === undefined
        ? new ResponseNormalizerOptions()
        : this.fillUndefinedKeys(options, new ResponseNormalizerOptions());
    this.init(nestApp);
  }

  private fillUndefinedKeys(
    currentOptionObject: any,
    defaultOptionsObject: any,
  ) {
    for (const key in defaultOptionsObject) {
      if (
        currentOptionObject[key] &&
        defaultOptionsObject[key] instanceof Object
      ) {
        currentOptionObject[key] = this.fillUndefinedKeys(
          currentOptionObject[key],
          defaultOptionsObject[key],
        );
      } else if (currentOptionObject[key] === undefined) {
        currentOptionObject[key] = defaultOptionsObject[key];
      }
    }
    return currentOptionObject;
  }

  private init(nestApp: INestApplication) {
    if (Configurator.options.useNormalizerInterceptor)
      nestApp.useGlobalInterceptors(new NormalizerInterceptor());
  }
}
