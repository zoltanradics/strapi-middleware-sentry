const Sentry = require('@sentry/node')

module.exports = (strapi) => {
  const middlewareName = 'sentry'
  const middlewareInitializedLog = `${middlewareName} middleware has been initialised.`
  const undefinedConfigurationLog = `${middlewareName} middleware configuration is missing from config/environments/**/middleware.json file.`

  return {
    initialize() {
      // Get Strapi level middleware settings
      const strapiMiddlewareSettings = strapi.config.middleware.settings

      // Check if Sentry middleware configuration is defined
      if (typeof strapiMiddlewareSettings[middlewareName] === 'undefined') {
        strapi.log.warn(undefinedConfigurationLog)
      }

      const {
        debug,
        settings: { dsn },
      } = strapiMiddlewareSettings[middlewareName]
      const environment = strapi.config.environment
      const {
        init,
        configureScope,
        addBreadcrumb,
        captureMessage,
        captureException,
        captureEvent,
      } = Sentry

      // IF debug mode is on, let the user know if middleware was initialized
      if (debug) {
        strapi.log.info(middlewareInitializedLog)
      }

      // Initialize Sentry SDK if dsn is defined on the middleware configuration
      if (typeof dsn !== 'undefined') {
        init({ dsn, environment })
      } else {
        strapi.log.warn(
          `${middlewareName} middleware can not be initialised. Sentry's "dsn" property is not defined in the middleware configuration.`
        )
      }

      // Expose Sentry functions to Strapi instance
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
