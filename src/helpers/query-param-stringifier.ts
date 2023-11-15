import { Configurator } from '../configuration/configurator';
import StringFormatter from 'string-utils-ts';

export default class QueryParamStringifier {
  public static stringifyQueryParams(queryParams: Map<string, string>) {
    return Array.from(queryParams.keys())
      .map(
        (key) =>
          `'${queryParams.get(key)}' ${this.stringifyQueryParamKey(key)}`,
      )
      .join(` ${Configurator.options.queryParamsOptions.joinedBy.trim()} `);
  }

  private static stringifyQueryParamKey(key: string) {
    return StringFormatter.splitByCasing(key).join(' ');
  }
}
