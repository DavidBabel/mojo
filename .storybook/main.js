// @ts-check
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {import('@storybook/core-common').StorybookConfig} */
const storybookConfiguration = {
  stories: ["../src/front/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: config => {
    config.resolve.plugins = config.resolve.plugins ?? [];
    config.resolve.plugins.push(
      // @ts-ignore
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
        configFile: "./tsconfig.json",
      }),
    );
    return {
      ...config,
      performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
      },
    };
  },
};

module.exports = storybookConfiguration;
