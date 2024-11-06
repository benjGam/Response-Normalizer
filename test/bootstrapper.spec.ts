import { RequestMethod } from '@nestjs/common';
import { Bootstrapper } from '../src/bootstrapper';
import { MessageWrapper } from '../src/interfaces/settings/message-wrapper';

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

  test('Invokation of "fillUndefinedSettingValues" should return default settings', () => {
    expect(
      Bootstrapper['fillUndefinedSettingValues'](
        {},
        Bootstrapper['getDefaultSettings'](),
      ),
    ).toEqual(Bootstrapper['getDefaultSettings']());
  });

  test('Invokation of "fillUndefinedSettingValues" should return filled settings', () => {
    defaultSettings['test'] = '';
    expect(
      Bootstrapper['fillUndefinedSettingValues'](
        {
          test: '',
        },
        Bootstrapper['getDefaultSettings'](),
      ),
    ).toEqual(defaultSettings);
  });

  test('Invokation of "fillUndefinedSettingValues" should return filled settings', () => {
    delete defaultSettings['test'];
    expect(
      Bootstrapper['fillUndefinedSettingValues'](
        {
          responseMessages: new Map<RequestMethod, MessageWrapper>(),
        },
        Bootstrapper['getDefaultSettings'](),
      ),
    ).toEqual(defaultSettings);
  });
});
