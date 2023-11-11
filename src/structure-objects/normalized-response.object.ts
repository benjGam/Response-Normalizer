import { HttpStatus } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';

export class NormalizedResponseObject {
  public message: string;
  public data: any | any[];
  public statusCode: HttpStatus;
}

export class NormalizedResponseEntryObject extends OmitType(
  NormalizedResponseObject,
  ['data'],
) {}
