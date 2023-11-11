import { NormalizerInterceptor as InternalNormalizerInterceptor } from './normalizer.interceptor';
import { ExternalService as InternalExternalService } from './metadata-decorators/external-service.decorator';
import { default as RI } from './reflector.interceptor';

export const NormalizerInterceptor = InternalNormalizerInterceptor;
export const ExternalService = InternalExternalService;
export const ReflectorInterceptor = RI;
