import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_THEME_COLOR.BACKGROUND,
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: widthPercentageToDP('5%'),
    paddingTop: heightPercentageToDP('2.5%'),
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  text: {
    fontSize: heightPercentageToDP('1.9%'),
    fontFamily: 'Nunito',
    fontWeight: '500',
  },
  textBold: {
    fontWeight: 'bold',
    paddingVertical: heightPercentageToDP('0.6%')
  },
  box1:{
    padding:heightPercentageToDP('1.6'),
    borderRadius:16,
    // borderWidth:1
  },
  box2:{
    marginTop:heightPercentageToDP('8%')
  }
});
