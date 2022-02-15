# Known issues

You can look here at git history for past issues : https://github.githistory.xyz/DavidBabel/mojo/blob/main/ISSUES.md

## issues

- in local dev env, the videos seems not to load on safari browser

- the hook useIsMobile does not handle any resize event.
It is a problem for the demo if the user tries responsive by changing it's browser size
But it's not a big deal since users usually never do so

- unit tests and e2e tests are handled together, they may be splited

- database migrations are not handled yet

- only canary version of nextjs has working middleware with env vars
