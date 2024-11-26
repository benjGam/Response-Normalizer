import { INestApplication } from '@nestjs/common';
import { NormalizerInterceptor } from './interceptors/normalizer-interceptor';
import { defaultNormalizerSettings } from './helpers/default-normalizer-settings';
import { NormalizerSettings } from './interfaces/settings/normalizer-settings';
import { SettingsType } from './types/settings.type';
import Logger from './helpers/logger';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';

export class NormalizerBootstrapper {
  private static _settings: NormalizerSettings;

  public static bootstrap(
    app: INestApplication,
    settings: NormalizerSettings = undefined,
  ): void {
    app.useGlobalInterceptors(new NormalizerInterceptor());
    Logger.init(settings.debugMode);
    this._settings = !settings
      ? defaultNormalizerSettings
      : this.fillUndefinedSettingValues(settings, defaultNormalizerSettings);
    if (this._settings.useBuiltInExceptionFilter)
      app.useGlobalFilters(new HttpExceptionFilter());
  }

  private static fillUndefinedSettingValues(
    settingObjectToFill: SettingsType,
    filledSettingObject: SettingsType,
  ): any {
    for (const key in filledSettingObject) {
      if (
        settingObjectToFill[key] === undefined ||
        (settingObjectToFill[key] instanceof Map &&
          settingObjectToFill[key].size == 0)
      ) {
        settingObjectToFill[key] = filledSettingObject[key];
        continue;
      }
      if (filledSettingObject[key] instanceof Object) {
        settingObjectToFill[key] = this.fillUndefinedSettingValues(
          settingObjectToFill[key],
          filledSettingObject[key],
        );
      }
    }
    return settingObjectToFill;
  }

  public static get settings(): NormalizerSettings {
    return this._settings;
  }
}
