import '@testing-library/jest-dom';
import { configure } from '@testing-library/vue';
import Vue from 'vue';
import Vuex from 'vuex';

configure({
  /* Sets the attribute to look for on the HTML element when using getByTestId */
  testIdAttribute: 'id',
  /* Overrides default error logging when tests fails */
  getElementError: (message) => {
    const error = new Error(message);
    error.name = 'TestingLibraryElementError';
    error.stack = null;
    return error;
  },
});
Vue.use(Vuex);
