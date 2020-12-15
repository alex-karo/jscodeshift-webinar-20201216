import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'args-to-object', { args: 'date,format,timezone' }, 'simple');
defineTest(__dirname, 'args-to-object', { args: 'date,format,timezone' }, 'alias-in-import');
