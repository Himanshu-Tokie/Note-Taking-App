import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { PLATEFORM } from '../../Constants/Strings';


export const usePushNotification = () => {
    const requestUserPermission = async () => {
      if (Platform.OS === PLATEFORM.IOS) {
        //Request iOS permission
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          // console.log('Authorization status:', authStatus);
        }
      } else if (Platform.OS === PLATEFORM.ANDROID) {
        //Request Android permission (For API level 33+, for 32 or below is not required)
        const res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }
    }
  
    const getFCMToken = async () => {
      const fcmToken = await messaging().getToken();
    };
  
    const listenToForegroundNotifications = async () => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert(JSON.stringify(remoteMessage))
      });
      return unsubscribe;
    }
  
    const listenToBackgroundNotifications = async () => {
      const unsubscribe = messaging().setBackgroundMessageHandler(
        async remoteMessage => {
            Alert.alert(JSON.stringify(remoteMessage))
        },
      );
      return unsubscribe;
    }
  
    const onNotificationOpenedAppFromBackground = async () => {
      const unsubscribe = messaging().onNotificationOpenedApp(
        async remoteMessage => {
            Alert.alert(JSON.stringify(remoteMessage))
        },
      );
      return unsubscribe;
    };  
    const onNotificationOpenedAppFromQuit = async () => {
      const message = await messaging().getInitialNotification();
    };
  
    return {
      requestUserPermission,
      getFCMToken,
      listenToForegroundNotifications,
      listenToBackgroundNotifications,
      onNotificationOpenedAppFromBackground,
      onNotificationOpenedAppFromQuit,
    };
  };