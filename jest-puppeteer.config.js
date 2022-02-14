// @ts-check

const jestPuppeteerConfig = {
  launch: {
    headless: true,
  },
  server: {
    command: "yarn start:e2e:tests",
    launchTimeout: 45000,
    port: 3000,
  },
};

module.exports = jestPuppeteerConfig;
