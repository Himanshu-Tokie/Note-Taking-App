import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';
//  login
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingTop: heightPercentageToDP('4'),
    alignItems: 'center',
  },

  colorText: {
    color: LIGHT_THEME_COLOR.BACKGROUND1,
    fontWeight:'bold',
    paddingBottom:heightPercentageToDP('1%')
  },
  button:{
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
    // maxWidth: 
  },
  error:{
    color:'red',
    fontStyle:'italic',
    fontSize:heightPercentageToDP('1.8'),
    fontWeight:'bold'
  },
  errorContainer:{
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:heightPercentageToDP('5')
  }
});
