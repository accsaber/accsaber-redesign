FROM node:18-alpine as base

RUN corepack enable
RUN corepack prepare pnpm@7.24.3 --activate

FROM base as deps

RUN mkdir /app
WORKDIR /app

ADD package.json pnpm-lock.yaml ./
RUN pnpm install --production=false

FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json pnpm-lock.yaml ./
RUN pnpm prune --production

FROM base as build

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN pnpm run build

FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["pnpm", "start"]
