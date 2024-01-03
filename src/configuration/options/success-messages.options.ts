export default class SuccessMessagesOptions {
  public createdMessage?: string = '::subjectModuleName has been created';
  public gettedMessage?: string =
    '::subjectModuleName ::stringifiedQueryParams has been getted';
  public updatedMessage?: string =
    '::subjectModuleName ::stringifiedQueryParams has been updated';
  public deletedMessage?: string =
    '::subjectModuleName has been deleted ::stringifiedQueryParams';
}
