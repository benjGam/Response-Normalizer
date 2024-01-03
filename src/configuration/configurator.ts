import { INestApplication } from '@nestjs/common';
import ResponseNormalizerOptions from './options/response-normalizer.options';
import { NormalizerInterceptor } from '../interceptors/normalizer.interceptor';

export class Configurator {
  public static options: ResponseNormalizerOptions;
  public static nestApp: INestApplication;

  constructor(nestApp: INestApplication, options?: ResponseNormalizerOptions) {
    Configurator.nestApp = nestApp;
    Configurator.options =
      options === undefined
        ? new ResponseNormalizerOptions()
        : this.parseOptions(options);
    this.init();
  }

  private parseOptions(options: ResponseNormalizerOptions) {
    options = this.fillUndefinedKeys(options, new ResponseNormalizerOptions());
    options = this.cleanFormattingRules(options);
    return options;
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

  private init() {
    Configurator.nestApp.useGlobalInterceptors(new NormalizerInterceptor());
    if (Configurator.options.ormInterceptor)
      Configurator.nestApp.useGlobalInterceptors(
        Configurator.options.ormInterceptor,
      );
  }
}
