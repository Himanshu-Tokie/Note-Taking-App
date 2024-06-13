/* button */

import { Platform, StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: LIGHT_THEME_COLOR.BACKGROUND1,
    width: widthPercentageToDP('82%'),
    padding: widthPercentageToDP('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: heightPercentageToDP('2%'),
    fontWeight: 'bold',
  },
});

export type Styles = typeof styles;