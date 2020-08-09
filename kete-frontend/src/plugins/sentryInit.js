import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as SentryTracing from '@sentry/tracing';
import { Vue as VueIntegration } from '@sentry/integrations';
import config from '@/config';

function sentryDisabledHandler(event, hint) {
  /* Note: originalException might not be an Error if Sentry.captureMessage was invoked */
  const error = hint?.originalException;
  // eslint-disable-next-line no-console
  const log = event.level == 'error' ? console.error : console.log;
  if (error) {
    log(error);
  }
  /* discard event */
  return null;
}

function initSentry(router) {
  const options = {
    dsn: 'https://232e82ad08504065bb35aa6c5e4cc980@o318766.ingest.sentry.io/6179111',
    integrations: [
      new VueIntegration({ Vue, attachProps: true }),
      new SentryTracing.Integrations.BrowserTracing({
        beforeNavigate: context => {
          const { route } = router.resolve(context.name);
          const matchedRoute = route.matched[route.matched.length - 1];
          return {
            ...context,
            /*
             * Use route path as transaction name to remove path param values.
             * Take last matched route in case a child route was matched.
             */
            name: matchedRoute?.path || context.name,
          };
        },
      }),
    ],
    normalizeDepth: 10,
    tracesSampleRate: config.values.sentryTracesSampleRate,
    release: `kete@${window.version.build}`,
    environment: config.values.env,
  };
  if (!config.values.sentryEnabled) {
    options.beforeSend = sentryDisabledHandler;
  }
  Sentry.init(options);
}

export default initSentry;
