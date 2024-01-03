import MessagesOptions from './messages.options';
import QueryParamsOptions from './query-params.options';
import ReflectorInterceptor from 'interceptors/reflector.interceptor';

export default class ResponseNormalizerOptions {
  public messages?: MessagesOptions = new MessagesOptions();
  public queryParamsOptions?: QueryParamsOptions = new QueryParamsOptions();
  public includeStatusCode?: boolean = true;
  public ormInterceptor?: ReflectorInterceptor;
}
