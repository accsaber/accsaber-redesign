# AccSaber Frontend V2

A complete rewrite of the AccSaber frontend, intended to be deployed to Fly.io (usually by CI/CD)

Uses <https://remix.run>

## Dependencies

package management is done with pnpm, make sure you have that installed.

```bash
# install dependencies
pnpm i

# start dev server
pnpm dev
```

## Building/Running

The easiest way to run the app for production is to just use docker.
Make sure to change the redis address in `app/lib/api/config/config.prod.ts`,
then build and run it like any other docker app, listening on port 8080.

If you're not into the whole Docker thing, build it with `pnpm build` and run it with `pnpm start`. Easy. (i think).
