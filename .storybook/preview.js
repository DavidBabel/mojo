import "antd/dist/antd.css";
import "~/front/styles/globals.css";
// import "@vime/core/themes/default.css";

import * as NextImage from "next/image";

// disable next image optimisation in storybook
// ref: https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
