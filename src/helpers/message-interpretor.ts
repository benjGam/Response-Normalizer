import { StringifiableParsedExecContextObject } from '../structure-objects/parsed-exec-context.object';
import StatusCodeAliases from './aliases/status-code.alias';
import StringifiedQueryParamsAliases from './aliases/stringified-query-params.alias';
import SubjectModuleAliases from './aliases/subject-module.alias';

export class MessageInterpretor {
  private static aliases = {
    subjectModuleName: SubjectModuleAliases.getAliases(),
    stringifiedQueryParams: StringifiedQueryParamsAliases.getAliases(),
    statusCode: StatusCodeAliases.getAliases(),
  };

  public static getInterpretedMessage(
    message: string,
    structObject: StringifiableParsedExecContextObject,
  ) {
    message = this.processedAliasesMessage(message);

    Array.from(message.matchAll(/::(\w+)/g)).forEach(
      (interpretedOptionMatch: RegExpMatchArray) =>
        (message = message.replace(
          interpretedOptionMatch[0],
          structObject[interpretedOptionMatch[1]],
        )),
    );
    return this.cleanMessageFromGarbageSpaces(message);
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

  private static cleanMessageFromGarbageSpaces(message: string) {
    return message
      .split(' ')
      .filter((value) => value != ' ' && value != '')
      .join(' ');
  }
}
