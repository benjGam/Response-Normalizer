import { SettingsType } from './types/';
import { INestApplication } from '@nestjs/common';
import { NormalizerInterceptor } from './interceptors/';
import { HttpExceptionFilter } from './exception-filters/';
import { defaultNormalizerSettings, Logger } from './helpers/';
import { NormalizerSettings } from './interfaces/settings/';

export class NormalizerBootstrapper {
  private static _settings: NormalizerSettings;

  /**
   *
   * This method should be used once in `bootstrap` function of API.
   * It's used to bootstrap package with needed components (atleast an interceptor).
   * This could be not invoked, but it's recommanded way to use package.
   *
   * @param app - NestApplication object
   * @param settings - NormalizerSettings object
   */

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

  /**
   *
   * This method is used to recursively fill the settings
   * which aren't set by third-party developer
   *
   * @param settingObjectToFill - NormalizerSetting object or sub object from it
   * @param filledSettingObject - DefaultNormalizerSetting object or sub object from it
   * @returns
   */

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

  /**
   * This is a property getter to getting normalize settings.
   */

  public static get settings(): NormalizerSettings {
    return this._settings;
  }
}
