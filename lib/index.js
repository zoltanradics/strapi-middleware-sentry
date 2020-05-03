const Sentry = require('@sentry/node')

module.exports = (strapi) => {
  const middlewareName = 'sentry'
  const middlewareInitialisedLog = `${middlewareName} middleware has been initialised.`
  const uncompleteSettingsLog = `${middlewareName} middleware configuration must contain a "settings" object. This object must contain at least the dsn property to initialise Sentry SDK. Check the config/environments/**/middleware.json file.`

  return {
    initialize() {
      // Get Strapi level middleware settings
      const strapiMiddlewareSettings = strapi.config.middleware.settings
      const { debug, settings } = strapiMiddlewareSettings[middlewareName]
      const environment = strapi.config.environment
      const {
        init,
        configureScope,
        addBreadcrumb,
        captureMessage,
        captureException,
        captureEvent,
      } = Sentry

      if (
        typeof settings === 'undefined' &&
        typeof settings.dsn === 'undefined'
      ) {
        strapi.log.error(uncompleteSettingsLog)
      } else {
        // Initialise Sentry SDK
        init({ ...settings, environment })

        // IF debug mode is on, let the user know if middleware was initialised
        if (debug) {
          strapi.log.info(middlewareInitialisedLog)
        }
      }

      // Make Sentry methods available on Strapi instance
      strapi.sentry = {
        configureScope,
        addBreadcrumb,
        captureMessage,
        captureException,
        captureEvent,
      }

      // Capture the error and send to Sentry
      strapi.app.use(async (_ctx, next) => {
        try {
          await next()
        } catch (error) {
          captureException(error)
          throw error
        }
      })
    },
  }
}
