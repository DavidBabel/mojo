# setup heroku logs to go into datadog

## doc

```bash
# https://docs.datadoghq.com/fr/logs/guide/collect-heroku-logs/
heroku drains:add 'https://http-intake.logs.datadoghq.eu/api/v2/logs/?dd-api-key=<CLÉ_API_DD>&ddsource=heroku&env=<ENVIRONNEMENT>&service=<SERVICE>&host=<HOST>' -a <NOM_APPLICATION>
```

## commands

```bash
# replace <DD_API_KEY>
# prod
heroku drains:add 'https://http-intake.logs.datadoghq.eu/api/v2/logs/?ddsource=heroku&env=production&service=mojo-prod&dd-api-key=<DD_API_KEY>' -a mojo-video-prod

# staging
heroku drains:add 'https://http-intake.logs.datadoghq.eu/api/v2/logs/?ddsource=heroku&env=staging&service=mojo-staging&dd-api-key=<DD_API_KEY>' -a mojo-video-staging

# review-apps
# replace <review-app-name> with review app name
heroku drains:add 'https://http-intake.logs.datadoghq.eu/api/v2/logs/?ddsource=heroku&env=review&service=mojo-review-app&dd-api-key=<DD_API_KEY>' -a mojo-<review-app-name>
```
