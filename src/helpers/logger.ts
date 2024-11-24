import { Type } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';

export default class Logger {
  private static logger: WinstonLogger | undefined;

  public static init(debugActive: boolean): void {}

  public static debug<T>(caller: Type<T>, message: string): void {}
}
