import { NativeModules, ViewStyle, requireNativeComponent } from "react-native";

// import { NativeModules } from 'react-native';
const { AdsModule,AdView } = NativeModules;

interface AdBannerProps {
  adUnitId: string;
  style?: ViewStyle;
}

export const initializeAds = () => {
  AdsModule.initializeAds()
};

export const loadBanner = async (adUnitId:string) => {
  await AdView.loadBanner(adUnitId)
};

// export const AdBannerIOS = requireNativeComponent<AdBannerIOSProps>('AdView');

export const AdBanner = requireNativeComponent<AdBannerProps>('AdView');

// export const AdBannerComponent = Platform.select({
//   ios: requireNativeComponent('AdView'),
//   android: requireNativeComponent('AdView'),
// });


export const { CalendarModule } = NativeModules;