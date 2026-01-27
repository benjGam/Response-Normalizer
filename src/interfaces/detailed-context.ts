import { RequestMethod } from '@nestjs/common';

export interface DetailedContext {
  httpMethod: RequestMethod;
  handlerName: string;
  queryParameters: Map<string, string>;
  ruleOverrides: Map<string, any>;
  errorOccured: boolean;
}
