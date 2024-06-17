import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { SCREEN_CONSTANTS } from '../../Constants';
import { ICONS } from '../../Constants/Icons';
import { STRINGS } from '../../Constants/Strings';
import { logIn, updateUser } from '../../Store/Common';
import { signUpUser } from '../../Utils';
import { styles } from './style';

function isErrorWithCode(error) {
  return error.code !== undefined;
}

export default function Google() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '963157051833-a1elv0njn1tu58p9fjnfe8277bi2aj6c.apps.googleusercontent.com',
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn().catch(e => {
        console.log(e);
      });
      // console.log(userInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const ans = await auth().signInWithCredential(googleCredential);
      console.log(ans);
      // console.log('google sign in successful');

      if (ans.additionalUserInfo?.isNewUser) {
        signUpUser(ans.user, 'google.com', dispatch, navigation);
      } else {
        dispatch(logIn(true));
        dispatch(updateUser(ans.user.uid));
        await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(true)).catch(e =>
          console.log(e),
        );
        navigation.navigate(SCREEN_CONSTANTS.HomeNavigation);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('service error');
            
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
      <View style={styles.google}>
        <TouchableOpacity onPress={_signIn}>
          <View style={styles.googleContainer}>
            {ICONS.GOOGLE(
              Platform.OS == 'ios'?heightPercentageToDP('2%'):heightPercentageToDP('2.5%'),
              Platform.OS == 'ios'?heightPercentageToDP('2%'):heightPercentageToDP('2.5%'),
              'none',
            )}
            <Text style={styles.text}>{STRINGS.GOOGLE_SIGN_IN}</Text>
          </View>
        </TouchableOpacity>
      </View>
    
  );
}

