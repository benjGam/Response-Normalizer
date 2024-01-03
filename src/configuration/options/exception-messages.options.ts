export default class ExceptionMessagesOptions {
  public notFound?: string =
    'No ::subjectModuleName found for ::stringifiedQueryParams';
  public alreadyRegistered?: string =
    '::subjectModuleName was already registered for ::stringifiedQueryParams';
}
