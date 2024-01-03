import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/objects/response-normalizer.options';
import { Configurator } from './configuration/configurator';

export * from './decorators';

export const init = function (
  nestApp: any,
  options?: ResponseNormalizerOptions,
) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
  new Configurator(nestApp, options);
};
