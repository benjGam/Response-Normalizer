import { InterpretableFlag } from './interpretable-flag';

export class CallSubject extends InterpretableFlag {
  protected readonly _aliases: string[] = [];

  public get name(): string {
    return '';
  }
}
