import { INestApplication, RequestMethod } from '@nestjs/common';
import { NormalizerInterceptor } from 'interceptors/normalizer-interceptor';
import { MessageWrapper } from 'interfaces/settings/message-wrapper';
import { NormalizerSettings } from 'interfaces/settings/normalizer-settings';

export class Bootstrapper {
  private static _settings: NormalizerSettings;
  private static debug: boolean;

  public static bootstrapNormalizer(
    app: INestApplication,
    settings: NormalizerSettings = undefined,
  ): void {
    app.useGlobalInterceptors(new NormalizerInterceptor());
    if (!settings) {
      this._settings = this.getDefaultSettings();
    }
  }

  private static fillUndefinedSettingValues(): void {}

  public static get settings(): NormalizerSettings {
    return this._settings;
  }

  private static getDefaultSettings(): NormalizerSettings {
    return {
      responseMessages: new Map<RequestMethod, MessageWrapper>([
        [
          RequestMethod.POST,
          {
            success: ':callSubject has been registered.',
            failure: ':callSubject was already registered.',
          },
        ],
        [
          RequestMethod.GET,
          {
            success: ':callSubject :callQueryParams has been getted.',
            failure: ':callSubject :callQueryParams was not found.',
          },
        ],
        [
          RequestMethod.DELETE,
          {
            success: ':callSubject :callQueryParams has been deleted.',
            failure: ':callSubject :callQueryParams cannot be deleted.',
          },
        ],
        [
          RequestMethod.PATCH,
          {
            success: ':callSubject :callQueryParams has been updated.',
            failure: ':callSubject :callQueryParams was not updated.',
          },
        ],
      ]),
      queryParameterFormatRule: {
        syntax: "(':name': ':value')",
        separator: ', ',
      },
      includeStatusCode: true,
    };
  }
}
