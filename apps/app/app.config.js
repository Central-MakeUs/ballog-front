const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY

export default {
  expo: {
    owner: 'kych0912',
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
      bundleIdentifier: 'com.ballog.app',
      infoPlist: {
        LSApplicationQueriesSchemes: [
          'kakaokompassauth',
          'kakaolink',
          'kakaoplus',
        ],
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [`kakao${KAKAO_NATIVE_APP_KEY}`],
          },
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.ballog.app',
      googleServicesFile: './android/app/google-services.json',
      // Instagram 공유를 위한 추가 설정
      intentFilters: [
        {
          action: 'android.intent.action.SEND',
          category: ['android.intent.category.DEFAULT'],
          data: {
            mimeType: 'image/*',
          },
        },
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
    },
    plugins: [
      'expo-router',
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
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
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              'https://devrepo.kakao.com/nexus/content/groups/public/',
            ],
          },
          ios: {
            deploymentTarget: '15.1',
            useFrameworks: 'static',
          },
        },
      ],
      [
        '@react-native-kakao/core',
        {
          nativeAppKey: KAKAO_NATIVE_APP_KEY,
          // android: {
          //   authCodeHandlerActivity: true,
          // },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
      [
        'react-native-share',
        {
          ios: ['fb', 'instagram', 'twitter', 'tiktoksharesdk'],
          android: ['com.facebook.katana', 'com.instagram.android'],
          // Instagram Stories 공유를 위한 추가 설정
          instagramStories: {
            backgroundImage: true,
            backgroundBottomColor: true,
            backgroundTopColor: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
      },
    },
  },
}
