// import { NativeModules } from 'react-native';
const { AdsModule } = NativeModules;

export const initializeAds = () => {
  AdsModule.initializeAds()
};

// export const loadAd = async (adUnitId:string) => {
//     try {
//       const result = await AdView.loadBanner(adUnitId);
//       console.log(result); // Ad loaded successfully
//     } catch (error) {
//       console.error(error); // Handle error if ad fails to load
//     }
//   };

import { NativeModules } from 'react-native';

export const { CalendarModule } = NativeModules;