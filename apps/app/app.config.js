export default {
  expo: {
    name: 'Ballog',
    slug: 'ballog',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'ballog',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.kych0912.app',
    },
    android: {
      adaptiveIcon: {
        // foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.kych0912.app',
    },
    web: {
      bundler: 'metro',
      output: 'static',
    },
    plugins: [
      'expo-router',
      // [
      //   'expo-splash-screen',
      //   {
      //     image: './assets/images/splash-icon.png',
      //     imageWidth: 200,
      //     resizeMode: 'contain',
      //     backgroundColor: '#ffffff',
      //   },
      // ],
      [
        '@react-native-seoul/kakao-login',
        {
          kakaoAppKey: '{{kakao api key}}',
          overrideKakaoSDKVersion: '2.11.2',
          kotlinVersion: '1.9.0',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              'https://devrepo.kakao.com/nexus/content/groups/public/',
            ],
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
}
