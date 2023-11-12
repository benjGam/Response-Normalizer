import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/response-normalizer.options';
import { Configurator } from 'configuration/configurator';

export const ExternalService = InternalExternalService;

export const init = function (
  nestApp: any,
  options?: ResponseNormalizerOptions,
) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
  new Configurator(nestApp, options);
};
