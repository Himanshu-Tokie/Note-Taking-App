import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { usePushNotification } from './src/Hooks/pushNotificationcustomHooks';
import AuthNavigation from './src/Navigation/AuthNavigation';
import { store } from './src/Store';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        // console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('Initialization complete!');
  });
  return (
    <Provider store={store}>
      <AuthNavigation></AuthNavigation>
    </Provider>
  );
}
