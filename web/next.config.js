const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.STORYBOOK_BASE_URL ?? "",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "@/styles/abstracts/_variables.scss"; @import "@/styles/abstracts/_mixins.scss";`,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@images"] = path.resolve(__dirname, "public");
    return config;
  },
};

module.exports = nextConfig;
