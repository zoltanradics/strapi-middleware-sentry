# strapi-middleware-sentry

**Strapi middleware to use Sentry**

Check out Strapi: [https://github.com/strapi/strapi](https://github.com/strapi/strapi)

The missing Sentry middleware for Strapi. By using this third-party (not official Strapi) middleware, you can use Sentry client on your Strapi instance, therefore you can access your Sentry methods in your application. (wherever Strapi instance is available)

> Please note, this plugin is in very early stage, it can happen that frequent updates will happen therefore you should try to update your npm package frequently!

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
    "settings": {
      "dsn": "[YOUR-DSN]"
      // any other Sentry configuration can come here
      // this object will pass into Sentry.init method
    }
  }
  // ... more middleware configurations
}
```

**2.** Add it on the top of the middleware stack in the `config/middleware.json` file.

```javascript
{
  "after": [
    ... other middlewares,
    "sentry"
  ]
}
```

**Access any of these Sentry methods on the Strapi instance**

- configureScope
- addBreadcrumb
- captureMessage
- captureException
- captureEvent

```javascript
strapi.sentry.captureException('Oops, something terribly wrong has happened!')
```

### Found any issues?

https://github.com/zoltanradics/strapi-middleware-sentry/issues

### Contact me if you

- need help
- want to contribute
- just want to chat about Strapi, React or Javascript or any exciting tech

Hit me up on: zoltan.radics@gmail.com
