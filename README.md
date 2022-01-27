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

### Endpoints

- ✅ dev (develop) : https://mojo-dev-nujin2hbiq-ew.a.run.app/
- ✅ staging (main) : https://mojo-staging-nujin2hbiq-ew.a.run.app/
- 🚧 prod (on tag) : https://mojo-prod-nujin2hbiq-ew.a.run.app/ (fail for now, wrong GCP settings)
