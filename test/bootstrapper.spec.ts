import { RequestMethod } from '@nestjs/common';
import { NormalizerBootstrapper } from '../src/bootstrapper';
import { MessageWrapper } from '../src/interfaces/settings/message-wrapper';
import JestRunner from './tests.utils';
import { NormalizerSettings } from '../src/interfaces/settings/normalizer.settings';
import { defaultNormalizerSettings } from '../src/helpers/';

const runner = new JestRunner(NormalizerBootstrapper);

describe('Settings', () => {});
