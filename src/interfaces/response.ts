import { HttpStatus } from '@nestjs/common';

export interface Response {
  message: string;
  data: any;
  statusCode: HttpStatus;
}
