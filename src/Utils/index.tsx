import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImageResizer from 'react-native-image-resizer';
import { Dispatch, UnknownAction } from 'redux';
import * as Yup from 'yup';
import { SCREEN_CONSTANTS } from '../Constants';
import { STRINGS, YUP_STRINGS } from '../Constants/Strings';
import { logIn, updateUser } from '../Store/Common';
import { RootStackScreenProps } from '../Types/navigation';
export const signUpUser = async (user:FirebaseAuthTypes.User, providerId:string,dispatch: Dispatch<UnknownAction>,navigation:RootStackScreenProps<"SignUp">) => {
  try {
    const notes = [
      {
        label: STRINGS.TEMP_LABEL_1,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT,
        url:[],
        time_stamp: firestore.FieldValue.serverTimestamp(),
      },
      {
        label: STRINGS.TEMP_LABEL_2,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT,
        url:[],
        time_stamp: firestore.FieldValue.serverTimestamp(),
      },
      {
        label: STRINGS.TEMP_LABEL_3,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT,
        url:[],
        time_stamp: firestore.FieldValue.serverTimestamp(),
      },
      {
        label: STRINGS.TEMP_LABEL_4,
        title: STRINGS.TEMP_TITLE,
        content: STRINGS.TEMP_CONTENT,
        url:[],
        time_stamp: firestore.FieldValue.serverTimestamp(),
      },
    ];
    const label = [STRINGS.TEMP_LABEL_1, STRINGS.TEMP_LABEL_2, STRINGS.TEMP_LABEL_3, STRINGS.TEMP_LABEL_4];
    const batch = firestore().batch();
    const collectionRef = firestore().collection(STRINGS.FIREBASE.USER);

    notes.forEach((doc) => {
      const newDocRef = firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(); 
      batch.set(newDocRef, doc);
    });

    label.forEach((doc) => {
      const newDocRef = collectionRef
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.LABELS)
        .doc(doc); 
      batch.set(newDocRef, { count: 1,time_stamp: firestore.FieldValue.serverTimestamp()});
    });
    await batch.commit();
    dispatch(logIn(true));
    dispatch(
      updateUser({
        uid: user.uid,
        providerId: providerId,
      })
    );
    await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(true))
        navigation.navigate(SCREEN_CONSTANTS.HomeNavigation);
  } catch (error) {
    // console.error('Error creating initial database:', error.code, error.message);
  }
};

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required(STRINGS.FIRST_NAME_WARNING).matches(/^[A-Za-z]+$/,YUP_STRINGS.INVALID_FIRST_NAME),
  lastName: Yup.string().required(STRINGS.LAST_NAME_WARNING).matches(/^[A-Za-z]+$/,YUP_STRINGS.INVALID_LAST_NAME),
  email: Yup.string().email(YUP_STRINGS.INVALID_EMAIL).required(STRINGS.EMAIL_WARNING),
  password: Yup.string()
    .min(8)
    .required(STRINGS.PASSWORD_WARNING)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      YUP_STRINGS.INVALID_PASSWORD,
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref(STRINGS.PASSWORD_SMALL)],
    YUP_STRINGS.PASSWORD_NOT_MATCH,
  ),
  number: Yup.string()
  .matches(/^\d{10}$/, YUP_STRINGS.PHONE_NUMBER_WARNING1)
  .required(YUP_STRINGS.PHONE_NUMBER_WARNING2)});

export const imageCompressor = async (photo:string) => {
  try {
    const compressedImage = await ImageResizer.createResizedImage(
      photo,
      600, // max width
      400, // max height
      'JPEG',
      80, 
    );
    return compressedImage.uri; 
  } catch (error) {
    // console.log('Image compression error:', error);
    throw error;
  }
};
