# mojo developpement plan

[Back to README](./README.md)

Here are my plan of action for the Mojo exercice by steps.
They are ordered but may be treated by pair for some.

The main goal is to answer the expectative with a great dev experience and strongly typed project

Status:

- ✅ : done (in prod)
- 🚧 : wip
- 🚫 : we don't want to talk about this one

## Step 1 : bootstrap ✅

- bootstrap a satisfying project with various tools ✅
  - nextjs ✅
  - good practice tooling and env ✅
  - prisma with a db ✅
- main goal on dev experience here, to save time later ✅

## Step 2 : CI / CD / Platform ✅

- setup and deploy to Google Cloud Platform ✅
  - enable CI / CD, maybe with Github actions or google deploy tool ✅
- draft basic front layout ✅
- manage simple video upload to GCP as POC ✅

## Step 3 : Model / GraphQl ✅

- build database model ✅
  - generate models and entites ✅ => auto generated
- add a basic GraphQl Schema ✅ => auto generated
- enable video upload thru GraphQl Schema ✅

## Step 4 : Auth 🚧

- find a smart way to manage auth ✅
- manage auth & jwt 🚧
- add login / register => ✅ (oauth)/ 🚧 / 🚧
- enable authenticated video upload 🚧

## Step 5 : UI / UX 🚧

- draft a modern UI with antd
- enhance video upload experience with advanced components 🚧
- develop admin / user experiences

## Step 6 : Non-regression

- Add test stack
- Add monitoring stack

## Step 7 : Compatibility check

- Check browser compatibility
- Check project & scripts : WSL / Linux compatibility

## Step 8 : Hofstadter

- show some respect to [Hofstadter law](https://en.wikipedia.org/wiki/Hofstadter%27s_law)

## Step 9 : Improvments (if time)

- cleanup
- docker setup
- manage migrations

## Step 10

- sign mojo contract
