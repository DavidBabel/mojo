# mojo

## Developping plan

It may evolve, but [the current plan is like so](./PLAN.md)

And here is an [architecture proposal](./tools/ressources/images/archi-proposal.drawio.png).

## Getting Started

```bash
# if needed install last LTS
nvm install 16
nvm use 16
npm install -g yarn

# setup local
yarn setup

# start dev env
yarn dev
```

We use 2 endpoints for livereload front/back performances:

- access http://localhost:4000 for nextjs server
- access the graphql API at http://localhost:3000

In production the server uses only one port, but in dev env it's way much faster

**Note:** we use prettier & eslint here, please adapt your editor
I will not add git hooks yet ^^

## Structure

- `@types` custom and enhanced types
  - `generated` contains [generated](https://www.graphql-code-generator.com/) typescripts types from schema.gql
- `pages/` all front endpoints ([nextjs path](https://nextjs.org/docs/basic-features/pages))
  - `api` api endpoints ([nextjs path](https://nextjs.org/docs/api-routes/introduction))
- `public` public assets like images ([nextjs path](https://nextjs.org/docs/basic-features/static-file-serving))
- `src/`
  - `front` : components and front-end logic
    - `components` : reactjs components based on [Antd](https://ant.design/)
    - `gql` : gql [mutation](https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation) and [queries](https://www.apollographql.com/docs/react/data/queries/#executing-a-query)
    - `hooks` : [reactjs hooks](https://reactjs.org/docs/hooks-intro.html)
    - `i18n` : [translations](https://react.i18next.com/)
    - `styles` : [scss](https://sass-lang.com/documentation)/css styles
    - `lib` : every other utils
  - `server` : backend logic
    - `boot` : boot configs of the servers ([express](https://expressjs.com/fr/4x/api.html)/[apollo](https://www.apollographql.com/docs/apollo-server/)/[nextjs](https://nextjs.org/))
    - `graphql` : [generated](https://prisma.typegraphql.com/docs/intro) resolvers setup, type-graphql resolvers/middleware and gql endpoint config
      - `generated` : contains the [generated](https://typegraphql.com/docs/emit-schema.html) schema.gql
      - `accessRight` : 🚧 [Apply typegraphql decorators](https://prisma.typegraphql.com/docs/advanced/additional-decorators/#additional-decorators-for-prisma-schema-resolvers) to generated resolvers
      - `auth` : 🚧 [custom auth management](https://typegraphql.com/docs/authorization.html)
      - `guards` : type-graphql [guards](https://typegraphql.com/docs/next/middlewares.html)
      - `middlewares` : type-graphql [middlewares](https://typegraphql.com/docs/next/middlewares.html)
      - `resolvers` : graphql [resolvers](https://typegraphql.com/docs/next/resolvers.html)
    - `prisma` : [db schema](https://www.prisma.io/) and management
    - `services` : isolated backend services
  - `iso` : iso (back/front) libs, configs and consts
- `tools/` : development tools and configs
  - `scripts` : TS or bash scripts to generate project state

## Deploy

Serverless with [Heroku](https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9)

### Setup link (private)

CI : https://github.com/DavidBabel/mojo/actions

CD/Run : https://dashboard.heroku.com/pipelines/6041acc2-fe63-4add-a8c3-51a9ce622ca9

### Following on Notion

https://www.notion.so/Following-Mojo-Web-3ae7435c8f904b3d81bc5a911913dd1a

### Endpoints

- ✅ dev (PR) : review app on PR or on demand
- ✅ staging (develop) : https://mojo-video-staging.herokuapp.com/
- ✅ prod (main) : https://mojo-video-prod.herokuapp.com/

## Issues

A list of known issues [can be found here](./ISSUES.md)
