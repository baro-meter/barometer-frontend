const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * Mono repo configuration
 * https://docs.expo.dev/guides/monorepos/
 *
 * @type {import('metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

const {transformer, resolver} = config;

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
