const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "styles/abstracts/_variables.scss"; @import "styles/abstracts/_mixins.scss";`,
  },
};

module.exports = nextConfig;
