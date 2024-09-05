import { NativeModules, ViewStyle, requireNativeComponent } from "react-native";

const { AdsModule } = NativeModules;

export const initializeAds = () => {
  AdsModule.initializeAds()
};

// export const loadBanner = async (adUnitId:string) => {
//   await AdView.loadBanner(adUnitId)
// };

// export const AdBannerIOS = requireNativeComponent<AdBannerIOSProps>('AdView');

// export const AdBannerComponent = requireNativeComponent<AdBannerProps>('BannerAdView');

// export const AdBannerComponent = Platform.select({
//   ios: requireNativeComponent('AdView'),
//   android: requireNativeComponent('AdView'),
// });
// import { NativeModules } from 'react-native';

const { InterstitialAdModule } = NativeModules;

// export const initializeAds = () => {
//   InterstitialAdModule.initializeAds();
// };

// export const loadInterstitialAd = (adUnitId:string) => {
//   InterstitialAdModule.loadInterstitialAd(adUnitId)
//   console.log('okok');
  
// };

// export const showInterstitialAd = () => {
//   InterstitialAdModule.showInterstitialAd();
// };

export const InterstitialAd = async (adUnitId:string) => {
  try {
      await InterstitialAdModule.loadInterstitialAd(adUnitId);
      await InterstitialAdModule.showInterstitialAd();
  } catch (error) {
      console.log(error);
  }
};

export const { CalendarModule } = NativeModules;