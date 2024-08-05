const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.STORYBOOK
    ? "barometer-frontend/storybook_static"
    : "",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "@/styles/abstracts/_variables.scss"; @import "@/styles/abstracts/_mixins.scss";`,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    console.log(process.env.STORYBOOK);
    if (process.env.STORYBOOK) {
      console.log("Storybook build detected");
    }
    // if (process.env.STORYBOOK) {
    //   config.module.rules.push({
    //     test: /\.(png|jpe?g|gif|svg)$/i,
    //     use: [
    //       {
    //         loader: "file-loader",
    //         options: {
    //           name: "[path][name].[ext]",
    //           publicPath: (url) => `barometer-frontend/storybook_static/${url}`,
    //         },
    //       },
    //     ],
    //   });
    // }
    return config;
  },
};

module.exports = nextConfig;
