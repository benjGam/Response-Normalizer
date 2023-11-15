import { INestApplication } from '@nestjs/common';
import ResponseNormalizerOptions from './objects/response-normalizer.options';
import { NormalizerInterceptor } from '../normalizer.interceptor';

export class Configurator {
  public static options: ResponseNormalizerOptions;

  constructor(nestApp: INestApplication, options?: ResponseNormalizerOptions) {
    Configurator.options =
      options === undefined
        ? new ResponseNormalizerOptions()
        : this.cleanFormattingRules(
            this.fillUndefinedKeys(options, new ResponseNormalizerOptions()),
          );
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

  private cleanFormattingRules(options: ResponseNormalizerOptions) {
    options.queryParamsOptions.formattingRules =
      options.queryParamsOptions.formattingRules
        .filter((rule) => rule.subStringSequence.length > 0)
        .filter((rule) => rule.replaceBy != null || rule.casing);
    return options;
  }

  private init(nestApp: INestApplication) {
    if (Configurator.options.useNormalizerInterceptor)
      nestApp.useGlobalInterceptors(new NormalizerInterceptor());
  }
}
