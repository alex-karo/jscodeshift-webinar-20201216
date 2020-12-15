import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'transform1', null, 'lodash1', {parser: 'ts'});
defineTest(__dirname, 'transform2', null, 'lodash1', {parser: 'ts'});
defineTest(__dirname, 'transform2', null, 'lodash2', {parser: 'ts'});
defineTest(__dirname, 'transform3', null, 'lodash1', {parser: 'ts'});
defineTest(__dirname, 'transform3', null, 'lodash2', {parser: 'ts'});
defineTest(__dirname, 'transform3', null, 'lodash3', {parser: 'ts'});
