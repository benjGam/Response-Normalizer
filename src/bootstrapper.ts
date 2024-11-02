import { INestApplication } from '@nestjs/common';
import { NormalizerSettings } from 'interfaces/settings/normalizer-settings';

export class Bootstrapper {
  private static _settings: NormalizerSettings;
  private static debug: boolean;

  public static bootstrapNormalizer(
    app: INestApplication,
    settings: NormalizerSettings = undefined,
  ): void {}

  private static fillUndefinedSettingValues(): void {}

  public static get settings(): NormalizerSettings {
    return this._settings;
  }
}
