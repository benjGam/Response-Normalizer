import { InterpretableFlag } from './interpretable-flag';

export class CallQueryParams extends InterpretableFlag {
  protected readonly _aliases: string[] = [];

  public get name(): string {
    return '';
  }
}
