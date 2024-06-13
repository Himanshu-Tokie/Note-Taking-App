import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import ImageResizer from 'react-native-image-resizer';
import * as Yup from 'yup';
import { SCREEN_CONSTANTS } from '../Constants';
import { STRINGS } from '../Constants/Strings';
import { logIn, updateUser } from '../Store/Common';
export const signUpUser = async (user, providerId,dispatch,navigation) => {
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
        .doc(); // Automatically generates a new document ID
      batch.set(newDocRef, doc);
    });

    label.forEach((doc) => {
      const newDocRef = collectionRef
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.LABELS)
        .doc(doc); // Automatically generates a new document ID
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
  firstName: Yup.string().required(STRINGS.FIRST_NAME_WARNING).matches(/^[A-Za-z]+$/,'Invalid first name'),
  lastName: Yup.string().required(STRINGS.LAST_NAME_WARNING).matches(/^[A-Za-z]+$/,'Invalid last name'),
  email: Yup.string().email('Invalid email').required(STRINGS.EMAIL_WARNING),
  password: Yup.string()
    .min(8)
    .required(STRINGS.PASSWORD_WARNING)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Invalid Password',
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref(STRINGS.PASSWORD_SMALL)],
    "Password doesn't match",
  ),
  number: Yup.string()
  .matches(/^\d{10}$/, 'Number must be exactly 10 digits')
  .required('Enter Number')});

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
