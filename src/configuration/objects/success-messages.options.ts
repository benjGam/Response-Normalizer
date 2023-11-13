export default class SuccessMessagesOptions {
  public createdMessage?: string = '::subjectModuleName has been created';
  public gettedMessage?: string =
    '::subjectModuleName for ::stringifiedQueryParams has been getted';
  public updatedMessage?: string =
    '::subjectModuleName for ::stringifiedQueryParams has been updated';
  public deletedMessage?: string =
    '::subjectModuleName has been deleted for ::stringifiedQueryParams';
}
