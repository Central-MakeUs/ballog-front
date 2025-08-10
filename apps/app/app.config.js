require('dotenv').config()

const KAKAO_NATIVE_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL
const EAS_PROJECT_ID = process.env.EXPO_PUBLIC_EAS_PROJECT_ID

export default {
  expo: {
    owner: 'kych0912',
    name: '볼로그',
    slug: 'ballog',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'ballog',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.ballog.app',
      googleServicesFile: './ios/GoogleService-Info.plist',
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
       [
        'expo-splash-screen',
        {
          image: './assets/images/icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#36C1B3',
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
          android: {
            authCodeHandlerActivity: true,
          },
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
      API_BASE_URL: API_BASE_URL,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
  },
}
