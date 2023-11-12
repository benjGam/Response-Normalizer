import { HttpStatus } from '@nestjs/common';

export class NormalizedResponseObject {
  public message: string;
  public data: any | any[];
  public statusCode: HttpStatus;
}
