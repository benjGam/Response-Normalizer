export abstract class InterpretableFlag {
  //Have to be rework in UML
  private readonly _aliases: string[];

  public abstract get name(): string;
  public get aliases(): string[] {
    return this._aliases;
  }
}
