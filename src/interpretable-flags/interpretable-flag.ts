export abstract class InterpretableFlag {
  protected abstract readonly _aliases: string[];

  public get name(): string {
    return this.constructor.name;
  }
  public get aliases(): string[] {
    return this._aliases;
  }
}
