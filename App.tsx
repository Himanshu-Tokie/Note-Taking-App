import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { usePushNotification } from './src/Hooks/pushNotificationcustomHooks';
import AuthNavigation from './src/Navigation/AuthNavigation';
import { store } from './src/Store';

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
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);


  return (
    <Provider store={store}>
      <AuthNavigation></AuthNavigation>
    </Provider>
  );
}
