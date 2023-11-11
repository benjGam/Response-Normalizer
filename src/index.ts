import { NormalizerInterceptor as InternalNormalizerInterceptor } from './normalizer.interceptor';
import { ExternalService as InternalExternalService } from 'metadata-decorators/external-service.decorator';

export const NormalizerInterceptor = InternalNormalizerInterceptor;
export const ExternalService = InternalExternalService;
