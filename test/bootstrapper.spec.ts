import { RequestMethod } from '@nestjs/common';
import { Bootstrapper } from '../src/bootstrapper';
import { MessageWrapper } from '../src/interfaces/settings/message-wrapper';
import JestRunner from './tests.utils';
import { NormalizerSettings } from '../src/interfaces/settings/normalizer-settings';

const runner = new JestRunner(Bootstrapper);

describe('Settings', () => {
  test(`Should be the default settings`, () => {
    expect(Bootstrapper['getDefaultSettings']()).toEqual({
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
    });
  });

  const defaultSettings = Bootstrapper['getDefaultSettings']();

  runner.runBasicTests(
    Bootstrapper['fillUndefinedSettingValues'],
    new Map<Function, NormalizerSettings>([
      [() => [{}, defaultSettings], defaultSettings],
      [
        () => [
          {
            responseMessages: new Map<RequestMethod, MessageWrapper>(),
          },
          defaultSettings,
        ],
        defaultSettings,
      ],
    ]),
  );

  const modifiedSettings = Bootstrapper['getDefaultSettings']();
  modifiedSettings['queryParameterFormatRule'] = {
    syntax: "(':name': ':value')",
    separator: ' and ',
  };

  runner.runBasicTests(
    Bootstrapper['fillUndefinedSettingValues'],
    new Map<Function, NormalizerSettings>([
      [
        () => [
          {
            queryParameterFormatRule: {
              syntax: "(':name': ':value')",
              separator: ' and ',
            },
          },
          defaultSettings,
        ],
        modifiedSettings,
      ],
    ]),
  );
});
