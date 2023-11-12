import { INestApplication } from '@nestjs/common';
import ResponseNormalizerOptions from './response-normalizer.options';
import { NormalizerInterceptor } from '../normalizer.interceptor';

export class Configurator {
  public static options: ResponseNormalizerOptions;

  constructor(nestApp: INestApplication, options?: ResponseNormalizerOptions) {
    Configurator.options = this.autoBuild(options);
    this.init(nestApp);
  }

  private autoBuild(options?: ResponseNormalizerOptions) {
    if (options === undefined) {
      return new ResponseNormalizerOptions();
    }
    const baseOptions = new ResponseNormalizerOptions();
    options = this.fillPrimitiveOptions(options, baseOptions);
    for (const key of Object.keys(baseOptions).filter(
      (key) => typeof baseOptions[key] == 'object',
    )) {
      options[key] = this.fillComplexOptions(key, baseOptions, options);
    }
    return options;
  }

  private fillPrimitiveOptions(
    currentOptions: ResponseNormalizerOptions,
    baseOptions: ResponseNormalizerOptions,
  ) {
    for (const key of Object.keys(baseOptions).filter(
      (key) =>
        typeof baseOptions[key] != 'object' && currentOptions[key] == undefined,
    )) {
      currentOptions[key] = baseOptions[key];
    }
    return currentOptions;
  }

  private fillComplexOptions(
    baseOptionSubKey: string,
    baseOptions: ResponseNormalizerOptions,
    currentOption: ResponseNormalizerOptions,
  ) {
    if (currentOption[baseOptionSubKey] === undefined)
      return baseOptions[baseOptionSubKey];
    for (const key of Object.keys(baseOptions[baseOptionSubKey]).filter(
      (key) => currentOption[baseOptionSubKey][key] === undefined,
    )) {
      currentOption[baseOptionSubKey][key] = baseOptions[baseOptionSubKey][key];
    }
    return currentOption[baseOptionSubKey];
  }

  private init(nestApp: INestApplication) {
    if (Configurator.options.useNormalizerInterceptor)
      nestApp.useGlobalInterceptors(new NormalizerInterceptor());
  }
}
