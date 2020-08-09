import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as Sentry from '@sentry/browser';
import config from '@/config';

axiosRetry(axios, {
  retries: 3
});

const apiClient = {

  async getAccountMemberships({ jwt }) {
    return await axios({
      method: 'GET',
      url: `${config.values.apiBaseUrl}/api/account-memberships`,
      headers: {
        authorization: jwt
      }
    });
  },
};

const sensitiveArgs = [
  'jwt',
];

/**
 * Handles call API successful response
 * @async
 * @callback onSuccessCb
 * @param {Object} response - Axios response object
 */

/**
 * Handles call API error
 * @callback onErrorCb
 * @param {Object} err - Error object
 */

/**
 * @callback suppressSentryCb
 * @param {Object} err - Error object
 * @return {Boolean} True if the error should not be logged to Sentry
 */

/**
 * Make an axios call to the backend
 * @param {Object} options
 * @param {String} options.operation - The name of the operation to invoke
 * @param {Object} options.args - The arguments relevant to the operation such as headers, body etc.
 * @param {onSuccessCb} options.onSuccess
 * @param {onErrorCb} [options.onError]
 * @param {suppressSentryCb} [options.suppressSentry]
 */
async function callApi({ args, operation, onSuccess, onError = () => { }, suppressSentry = () => false }) {
  try {
    const response = await apiClient[operation](args);
    await onSuccess(response);
  } catch (err) {
    const responseMessage = err?.response?.data?.message;
    /* Append API error code to message so it appears in Sentry issue name */
    err.message += responseMessage ? ` (${responseMessage})` : '';
    if (!suppressSentry(err)) {
      Sentry.withScope(function (scope) {
        Sentry.setExtra('operation', operation);
        for (let key in args) {
          if (!sensitiveArgs.includes(key)) {
            Sentry.setExtra(key, args[key]);
          }
        }
        scope.setFingerprint([operation, err.message]);
        Sentry.captureException(err);
      });
    }
    if (!config.values.sentryEnabled) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    onError(err);
  }
}

export default callApi;
