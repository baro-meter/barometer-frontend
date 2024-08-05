const path = require("path");

const isGhpage = process.env.GH_PAGES === "true";
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isGhpage ? "/barometer-frontend/storybook_static" : "",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "@/styles/abstracts/_variables.scss"; @import "@/styles/abstracts/_mixins.scss";`,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.module.rules.push({
      test,
    });
    return config;
  },
};

module.exports = nextConfig;
