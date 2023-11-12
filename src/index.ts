import { NormalizerInterceptor as InternalNormalizerInterceptor } from './normalizer.interceptor';
import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { default as RI } from './reflector.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';

export const NormalizerInterceptor = InternalNormalizerInterceptor;
export const ExternalService = InternalExternalService;
export const ReflectorInterceptor = RI;

export const init = function (nestApp: any) {
  nestApp.useGlobalFilters(new HttpExceptionFilter());
};
