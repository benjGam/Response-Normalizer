import { ExternalService as InternalExternalService } from './decorators/external-service.decorator';
import { CustomResponseMessage as InternalCustomResponseMessage } from './decorators/custom-response-message.decorator';
import { IgnoreFormattingRules as InternalIgnoreFormattingRules } from './decorators/ignore-formatting-rules.decorator';
import { IgnoreNormalization as InternalIgnoreNormalization } from './decorators/ignore-normalization.decorator';
import { HttpExceptionFilter } from './http-exception.filter';
import ResponseNormalizerOptions from './configuration/objects/response-normalizer.options';
import { Configurator } from './configuration/configurator';

export const ExternalService = InternalExternalService;
export const CustomResponseMessage = InternalCustomResponseMessage;
export const IgnoreFormattingRules = InternalIgnoreFormattingRules;
export const IgnoreNormalization = InternalIgnoreNormalization;

export { DoNotThrowOnEmpty } from './decorators/do-not-throw-on-empty';

export const init = function (
  nestApp: any,
  options?: ResponseNormalizerOptions,
) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
  new Configurator(nestApp, options);
};
