import { Type } from '@nestjs/common';
import winston, { Logger as WinstonLogger, format } from 'winston';

export class Logger {
  private static logger: WinstonLogger | undefined;

  public static init(debugActive: boolean): void {
    if (!debugActive) return;
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.printf(({ message }) => {
              return `${message}`;
            }),
          ),
        }),
      ],
    });
  }

  public static debug<T>(caller: Type<T>, message: string): void {
    if (this.logger) this.logger.debug(`[${caller.name}] ${message}`);
  }
}
