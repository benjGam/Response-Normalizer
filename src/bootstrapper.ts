import { INestApplication } from '@nestjs/common';
import { NormalizerInterceptor } from './interceptors/normalizer-interceptor';
import { defaultNormalizerSettings } from './helpers/default-normalizer-settings';
import { NormalizerSettings } from './interfaces/settings/normalizer-settings';
import { SettingsType } from './types/settings.type';

export class Bootstrapper {
  private static _settings: NormalizerSettings;
  private static debug: boolean;

  public static bootstrapNormalizer(
    app: INestApplication,
    settings: NormalizerSettings = undefined,
  ): void {
    app.useGlobalInterceptors(new NormalizerInterceptor());
    this._settings = !settings
      ? defaultNormalizerSettings
      : this.fillUndefinedSettingValues(settings, defaultNormalizerSettings);
  }

  //Have to be rework in UML
  private static fillUndefinedSettingValues(
    currentSettingObject: SettingsType,
    defaultSettingObject: SettingsType,
  ): any {
    for (const key in defaultSettingObject) {
      if (
        currentSettingObject[key] === undefined ||
        (currentSettingObject[key] instanceof Map &&
          currentSettingObject[key].size == 0)
      ) {
        currentSettingObject[key] = defaultSettingObject[key];
        continue;
      }
      if (defaultSettingObject[key] instanceof Object) {
        currentSettingObject[key] = this.fillUndefinedSettingValues(
          currentSettingObject[key],
          defaultSettingObject[key],
        );
      }
    }
    return currentSettingObject;
  }

  public static get settings(): NormalizerSettings {
    return this._settings;
  }
}
