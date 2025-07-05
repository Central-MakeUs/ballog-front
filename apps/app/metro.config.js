const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
   extraNodeModules: {
    ...defaultConfig.resolver.extraNodeModules,
    '@ballog/bridge': path.resolve(__dirname, '../../packages/bridge'),
  },
};

defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  path.resolve(__dirname, '../../packages/bridge'),
];

module.exports = defaultConfig;