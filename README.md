# mojo

## Developping plan

It may evolve, but [the current plan is like so](./PLAN.md)

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

## structure

- `pages` contains all front endpoints (nexjs)
- `pages/api` contains api endpoints (nexjs)
- `@types` contains custom and enhanced types
- `src` contains front / server and iso libs & confs

## deploy 🚧

Serverless with Google Cloud Platform

Deploy doc : https://www.youtube.com/watch?v=GhSAQ19f4HA
