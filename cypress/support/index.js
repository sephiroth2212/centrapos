// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import faker from 'faker';
import models from '../models';
import stubs from '../stubs';
import './commands';
global.faker = faker;
global.models = models;
global.stub = stubs;

require('cypress-terminal-report/src/installLogsCollector')();
