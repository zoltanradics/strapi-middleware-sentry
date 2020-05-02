# strapi-middleware-sentry

**Strapi middleware to use Sentry**

Check out Strapi: [https://github.com/strapi/strapi](https://github.com/strapi/strapi)

The missing Sentry middleware for Strapi. By using this third-party (not official Strapi) middleware, you can use Sentry client on your Strapi instance, therefore you can access your Sentry methods in your application. (wherever Strapi instance is available)

### How to install?

```
npm i strapi-middleware-sentry -S
```

### How to use?

**1.** Add your Sentry configuration to your `config/environments/**/middleware.json` file:

> Note: This middleware uses @sentry/node so check out: https://www.npmjs.com/package/@sentry/node for configuration guide.

```javascript
{
  // ... more middleware configurations
  "sentry": {
    "enabled": true,
    "debug": true,
    "settings": {
      "dsn": "[YOUR-DSN]"
    }
  }
  // ... more middleware configurations
}
```

**2.** Access any of these Sentry methods on the Strapi instance

- configureScope
- addBreadcrumb
- captureMessage
- captureException
- captureEvent

```javascript
strapi.sentry.captureException('Oops, something terribly wrong has happened!')
```
