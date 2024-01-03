import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { CustomResponseMessage as InternalCustomResponseMessage } from './metadata-decorators/custom-response-message.decorator';
import { IgnoreFormattingRules as InternalIgnoreFormattingRules } from './metadata-decorators/ignore-formatting-rules.decorator';
import { IgnoreNormalization as InternalIgnoreNormalization } from './metadata-decorators/ignore-normalization.decorator';
import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/objects/response-normalizer.options';
import { Configurator } from './configuration/configurator';

export const ExternalService = InternalExternalService;
export const CustomResponseMessage = InternalCustomResponseMessage;
export const IgnoreFormattingRules = InternalIgnoreFormattingRules;
export const IgnoreNormalization = InternalIgnoreNormalization;

export { DoNotThrowOnEmpty } from './metadata-decorators/do-not-throw-on-empty';

export const init = function (
  nestApp: any,
  options?: ResponseNormalizerOptions,
) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
  new Configurator(nestApp, options);
};
