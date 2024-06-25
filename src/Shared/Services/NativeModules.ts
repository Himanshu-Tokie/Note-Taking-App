import { NativeModules, ViewStyle, requireNativeComponent } from "react-native";

// import { NativeModules } from 'react-native';
const { AdsModule } = NativeModules;

interface AdBannerProps {
  adUnitId: string;
  // style?: ViewStyle;
}

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


export const { CalendarModule } = NativeModules;