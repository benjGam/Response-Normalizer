import { RequestMethod } from '@nestjs/common';

export interface DetailedContext {
  httpMethod: RequestMethod;
  handlerName: string;
  queryParameters: Map<string, string>;
  skippedQueryParametersIdentifiers: Array<string>;
  ruleOverrides: Array<string>;
  errorOccured: boolean;
}
