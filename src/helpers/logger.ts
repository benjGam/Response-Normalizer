import { Type } from '@nestjs/common';
import winston, { Logger as WinstonLogger, format } from 'winston';

export default class Logger {
  private static logger: WinstonLogger | undefined;

  public static init(debugActive: boolean): void {
    if (!debugActive) return;
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: format.combine(
            winston.format.colorize({ all: true }),
            format.printf(({ timestamp, label, message }) => {
              return `${timestamp} [${label}] : ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  public static debug<T>(caller: Type<T>, message: string): void {}
}
