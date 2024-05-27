import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_THEME_COLOR.BACKGROUND,
  },
  labelContainer: {
    paddingTop: heightPercentageToDP('2%'),
  },
  subContainer: {
    marginBottom: heightPercentageToDP('19%'),
  },
  list: {},
  addNotes: {
    position: 'absolute',
    bottom: 40,
    left: '25%',
  },
  customButton: {
    width: widthPercentageToDP('90%'),
  },
});
