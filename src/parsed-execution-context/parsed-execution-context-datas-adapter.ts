import StringFormatter from 'string-utils-ts';
import QueryParamOrMetaStringifier from '../helpers/query-param-stringifier';
import {
  ParsedExecContextObject,
  StringifiableParsedExecContextObject,
} from 'structure-objects/parsed-exec-context.object';

export default class ParsedExecContextObjectAdapter {
  private readonly stringifiedObject: StringifiableParsedExecContextObject;
  constructor(
    private readonly parsedExecutionContextDatas: ParsedExecContextObject,
    private readonly datas: any | any[],
  ) {
    this.stringifiedObject = new StringifiableParsedExecContextObject();
    this.dispatchBehavior();
    this.stringifiedObject.httpMethod =
      this.parsedExecutionContextDatas.httpMethod;
  }

  private dispatchBehavior() {
    const isExternallyManaged = this.areLogicAndHandlerModuleNameAreSame();
    this.stringifiedObject.subjectModuleName =
      this.getSubjectModuleName(isExternallyManaged);

    this.stringifiedObject.subjectModuleName =
      this.getAdaptedSubjectModuleByDatasLength();

    this.stringifiedObject.stringifiedQueryParams =
      this.getQueryParams(isExternallyManaged);
  }

  private getSubjectModuleName(isExternallyManaged: boolean) {
    return isExternallyManaged
      ? this.parsedExecutionContextDatas.handlerModuleName
      : this.parsedExecutionContextDatas.logicModuleName;
  }

  private getQueryParams(isExternallyManaged: boolean) {
    return QueryParamOrMetaStringifier.stringifyQueryParams(
      isExternallyManaged
        ? this.parsedExecutionContextDatas.queryParams
        : this.concatHandlerModuleNameToQueryParamsKeys(),
    );
  }

  private getAdaptedSubjectModuleByDatasLength() {
    return this.isSeveralDatas()
      ? StringFormatter.pluralize(this.stringifiedObject.subjectModuleName)
      : StringFormatter.singularize(this.stringifiedObject.subjectModuleName);
  }

  private isSeveralDatas() {
    return Array.isArray(this.datas);
  }

  private areLogicAndHandlerModuleNameAreSame() {
    return (
      StringFormatter.singularize(
        this.parsedExecutionContextDatas.handlerModuleName,
      ).toLowerCase() ==
      StringFormatter.singularize(
        this.parsedExecutionContextDatas.logicModuleName,
      ).toLowerCase()
    );
  }

  private formatHandlerModuleNameAsConcatenableForQueryParamKey() {
    return StringFormatter.singularize(
      this.parsedExecutionContextDatas.handlerModuleName,
    ).toLowerCase();
  }

  private queryParamKeyIncludesHandlerModuleName(key: string) {
    return (
      key.includes(
        this.formatHandlerModuleNameAsConcatenableForQueryParamKey(),
      ) ||
      key.includes(this.parsedExecutionContextDatas.handlerModuleName) ||
      key.includes(
        StringFormatter.singularize(
          this.parsedExecutionContextDatas.handlerModuleName,
        ),
      )
    );
  }

  private concatHandlerModuleNameToQueryParamsKeys() {
    const formatedHandlerModuleName =
      this.formatHandlerModuleNameAsConcatenableForQueryParamKey();
    const contatenedQueryParamsOrMetaKeys = new Map<string, string>();
    this.parsedExecutionContextDatas.queryParams.forEach((value, key) =>
      contatenedQueryParamsOrMetaKeys.set(
        this.queryParamKeyIncludesHandlerModuleName(key)
          ? key
          : `${formatedHandlerModuleName}_${key}`,
        value,
      ),
    );
    return contatenedQueryParamsOrMetaKeys;
  }

  public get adaptedObject(): StringifiableParsedExecContextObject {
    return this.stringifiedObject;
  }
}
