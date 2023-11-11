import { SringifiableParsedExecContextObject } from '../structure-objects/parsed-exec-context.object';

export class MessageInterpretor {
  private static aliases = {
    subjectModuleName: [
      'subjectmodulename',
      'modulename',
      'submodulename',
      'mn',
      'smn',
      'module',
      'submodule',
    ],
    stringifiedQueryParams: ['stringifiedqueryparams', 'queryparams', 'qp'],
    statusCode: ['statuscode', 'sc', 'status', 'stcd', 'stc', 'code'],
  };

  public static getInterpretedMessage(
    message: string,
    structObject: SringifiableParsedExecContextObject,
  ) {
    message = this.processedAliasesMessage(message);

    Array.from(message.matchAll(/::(\w+)/g)).forEach(
      (interpretedOptionMatch: RegExpMatchArray) =>
        (message = message.replace(
          interpretedOptionMatch[0],
          structObject[interpretedOptionMatch[1]],
        )),
    );
    return message;
  }

  private static processedAliasesMessage(message: string) {
    Array.from(message.matchAll(/::(\w+)/g)).forEach(
      (interpretedOption) =>
        (message = message.replace(
          interpretedOption[0],
          `::${this.getPropertyByAlias(interpretedOption[1])}`,
        )),
    );
    return message.replace('::undefined', 'non_context_datas_field');
  }

  private static getPropertyByAlias(alias: string) {
    return Object.keys(this.aliases).find((key) =>
      this.aliases[key].includes(alias.toLowerCase()),
    );
  }
}
