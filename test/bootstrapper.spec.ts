import { RequestMethod } from '@nestjs/common';
import { Bootstrapper } from '../src/bootstrapper';
import { MessageWrapper } from '../src/interfaces/settings/message-wrapper';
import JestRunner from './tests.utils';
import { NormalizerSettings } from '../src/interfaces/settings/normalizer-settings';
import { defaultNormalizerSettings } from '../src/helpers/default-normalizer-settings';

const runner = new JestRunner(Bootstrapper);

describe('Settings', () => {
  runner.runBasicTests(
    Bootstrapper['fillUndefinedSettingValues'],
    new Map<Function, NormalizerSettings>([
      [() => [{}, defaultNormalizerSettings], defaultNormalizerSettings],
      [
        () => [
          {
            responseMessages: new Map<RequestMethod, MessageWrapper>(),
          },
          defaultNormalizerSettings,
        ],
        defaultNormalizerSettings,
      ],
    ]),
  );

  const modifiedSettings = defaultNormalizerSettings;
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
          defaultNormalizerSettings,
        ],
        modifiedSettings,
      ],
    ]),
  );
});
