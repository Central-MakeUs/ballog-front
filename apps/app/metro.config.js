const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../../')

const defaultConfig = getDefaultConfig(projectRoot)

defaultConfig.watchFolders = [monorepoRoot]

defaultConfig.transformer = {
  ...defaultConfig.transformer,
}

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  extraNodeModules: {
    ...defaultConfig.resolver.extraNodeModules,
    '@ballog/bridge': path.resolve(__dirname, '../../packages/bridge'),
  },
  nodeModulesPaths: [
    path.resolve(monorepoRoot, 'node_modules'),
    path.resolve(projectRoot, 'node_modules'),
  ],
}

defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  path.resolve(__dirname, '../../packages/bridge'),
  monorepoRoot,
]

module.exports = defaultConfig
