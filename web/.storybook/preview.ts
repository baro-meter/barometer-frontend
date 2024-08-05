import type { Preview } from "@storybook/react";
import "./storybook.css";
import "../src/styles/base/_reset.scss";
import nextImage from 'next/image';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    assetsBasePath: "/barometer-frontend/",
  },
};

Object.defineProperties(nextImage, 'default', {
  configurable: true,
  value: 
})

export default preview;
