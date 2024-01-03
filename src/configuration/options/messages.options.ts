import ExceptionMessagesOptions from './exception-messages.options';
import SuccessMessagesOptions from './success-messages.options';

export default class MessagesOptions {
  success?: SuccessMessagesOptions = new SuccessMessagesOptions();
  errors?: ExceptionMessagesOptions = new ExceptionMessagesOptions();
}
