import type { StorybookConfig } from "@storybook/nextjs";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config: any, { configType }) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );
    // if (configType === "PRODUCTION") {
    //   config.output.publicPath = "/barometer-frontend/storybook_static";
    // }
    // config.module.rules.push({
    //   test: /\.(png|jpe?g|gif|svg)$/i,
    //   use: [
    //     {
    //       loader: "file-loader",
    //       options: {
    //         name: "[path][name].[ext]",
    //         publicPath: (url) => `/barometer-frontend/storybook_static/${url}`,
    //       },
    //     },
    //   ],
    // });
    const imageRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.test(/\.(png|jpe?g|gif|svg)$/i)
    );

    if (imageRule) {
      // 기존 로더의 옵션을 수정
      imageRule.options = {
        ...imageRule.options,
        publicPath: "/barometer-frontend/storybook_static/",
      };
    }

    return config;
  },
};
export default config;
