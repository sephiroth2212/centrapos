'use strict';

module.exports = {
  testPathIgnorePatterns: [
    'cypress',
  ],
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest-setup.js']
};
