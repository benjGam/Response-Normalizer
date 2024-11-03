export abstract class InterpretableFlag {
  protected abstract readonly _aliases: string[];

  public abstract get name(): string;
  public get aliases(): string[] {
    return this._aliases;
  }
}
