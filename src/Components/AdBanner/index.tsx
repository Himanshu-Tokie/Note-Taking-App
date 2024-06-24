// import React, { useEffect } from 'react';
// import { Platform, StyleSheet, View } from 'react-native';
// import { widthPercentageToDP } from 'react-native-responsive-screen';
// import { AdBanner, initializeAds, loadBanner } from '../../Shared/Services/NativeModules';

// interface AdBannerProps {
//   adUnitIdAndroid: string;
//   adUnitIdIOS: string;
// }

// const AdBannerComponent: React.FC<AdBannerProps> = ({ adUnitIdAndroid, adUnitIdIOS }) => {
//   useEffect(() => {
//     initializeAds(); // Initialize Ads if needed
//   }, []);
//   useEffect(() => {
    // if (Platform.OS === 'android') {
    //   loadBanner(adUnitIdAndroid).then(()=>{
    //     console.log('success loaded ad android');    
    //   }).catch((e)=>console.log(e,'catch in android')
    //   )
    // } 
//     // else if (Platform.OS === 'ios') {
//     //   loadBanner(adUnitIdIOS).then(()=>{
//     //     console.log('success loaded ad ios');    
//     //   }).catch((e)=>console.log(e,'ios')
//     //   )
//     // }
//   }, [adUnitIdAndroid, adUnitIdIOS]);

//   return (
//     <View style={styles.container}>
//         {/* <AdBannerComponent style={styles.banner} adUnitId/> */}
//       {Platform.OS === 'ios' && <AdBanner adUnitId={adUnitIdIOS} style={styles.banner} />}
//       {Platform.OS === 'android' && <AdBanner adUnitId={adUnitIdAndroid} style={styles.banner} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'flex-end',
//   },
//   banner: {
//     width: widthPercentageToDP('90'),
//     height: 50,
//     borderWidth:1,
//     borderColor:'red'
//   },
// });

// export default AdBannerComponent;

import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AdBanner, loadBanner } from '../../Shared/Services/NativeModules';

interface AdBannerProps {
  adUnitIdAndroid: string;
  adUnitIdIOS: string;
}

const AdBannerComponent: React.FC<AdBannerProps> = ({ adUnitIdAndroid, adUnitIdIOS }) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Call loadBanner if needed for Android here
      if (Platform.OS === 'android') {
        loadBanner(adUnitIdAndroid).then(()=>{
          console.log('success loaded ad android');    
        }).catch((e)=>console.log(e,'catch in android')
        )
      } 
    } 
    // else if (Platform.OS === 'ios') {
    //   Call loadBanner if needed for iOS here
    // }
  }, [adUnitIdAndroid, adUnitIdIOS]);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <AdBanner adUnitId={adUnitIdIOS} style={styles.banner} />}
      {Platform.OS === 'android' && <AdBanner adUnitId={adUnitIdAndroid} style={styles.banner} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: widthPercentageToDP('90%'),
    height: 50,
    borderWidth: 1,
    borderColor: 'red'
  },
});

export default AdBannerComponent;

