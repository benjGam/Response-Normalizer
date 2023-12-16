import ExceptionMessagesOptions from './exception-messages.options';
import QueryParamsOptions from './query-params.options';
import SuccessMessagesOptions from './success-messages.options';

export default class ResponseNormalizerOptions {
  public useNormalizerInterceptor?: boolean = true;
  public successMessages?: SuccessMessagesOptions =
    new SuccessMessagesOptions();
  public exceptionMessages?: ExceptionMessagesOptions =
    new ExceptionMessagesOptions();
  public queryParamsOptions?: QueryParamsOptions = new QueryParamsOptions();
  public includeStatusCode?: boolean = true;
}
