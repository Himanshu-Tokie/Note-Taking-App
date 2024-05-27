import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    a: {
      fontWeight: 'bold',
      color: LIGHT_THEME_COLOR.BACKGROUND1,
    },
    container: {
      flex: 1,
      backgroundColor: LIGHT_THEME_COLOR.BACKGROUND,
    },
    editor: {},
    rich: {
      flex: 1,
    },
    // text under rich 
    richeditor:{
      fontFamily:'Nunito',
    },
    richBar: {
      backgroundColor:LIGHT_THEME_COLOR.BACKGROUND1
    },
    tib: {
      textAlign: 'center',
      color: '#515156',
    },
    title:{
      fontFamily:'Nunito',
      fontSize:heightPercentageToDP('2.4%'),
      paddingVertical:heightPercentageToDP('2.4%'),
      paddingHorizontal:widthPercentageToDP('2%')
    },
    subContainer:{
      flex:1
    }
  });
  