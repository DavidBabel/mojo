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

In production the server uses only one port

**Note:** we use prettier & eslint here, please adapt your editor
I will not add git hooks yet ^^

## Structure

- `@types` contains custom and enhanced types
- `pages/` contains all front endpoints (nextjs)
  - `api` contains api endpoints (nextjs)
- `public` contains public assets like images (nextjs)
- `src/`
  - `front` : contains components and front-end logic
  - `server` : contains backend logic
  - `iso` : contains iso (back/front) libs & configs
- `tools/` : contains development tools and configs
  - `scripts` : typescript or bash script to generate project state

## Deploy

Serverless with Google Cloud Platform

### Setup link (private)

CI : https://console.cloud.google.com/cloud-build/dashboard?hl=fr&project=mojo-339419

Run : https://console.cloud.google.com/run?hl=fr&project=mojo-339419

### Following on Notion

https://www.notion.so/Following-Mojo-Web-3ae7435c8f904b3d81bc5a911913dd1a

### Endpoints

- ✅ dev (develop) : https://mojo-dev-nujin2hbiq-ew.a.run.app/
- ✅ staging (main) : https://mojo-staging-nujin2hbiq-ew.a.run.app/
- 🚧 prod (on tag) : https://mojo-prod-nujin2hbiq-ew.a.run.app/ (fail for now, wrong GCP settings)

## Issues

A list of known issues [can be found here](./ISSUES.md)
