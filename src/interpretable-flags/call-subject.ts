import { InterpretableFlag } from './interpretable-flag';

export class CallSubject extends InterpretableFlag {
  //Have to be rework in UML
  protected readonly _aliases: string[] = [];

  public get name(): string {
    return '';
  }
}
