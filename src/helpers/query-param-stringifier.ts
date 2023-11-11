import StringFormatter from 'string-utils-ts';

export default class QueryParamStringifier {
  public static stringifyQueryParams(queryParams: Map<string, string>) {
    return Array.from(queryParams.keys())
      .map(
        (key) =>
          `'${queryParams.get(key)}' ${this.stringifyQueryParamKey(key)}`,
      )
      .join(' and ');
  }

  private static stringifyQueryParamKey(key: string) {
    return StringFormatter.formatEachWords(key, '_').replace('_', ' ');
  }
}
