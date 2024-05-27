import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container:{
      paddingHorizontal:widthPercentageToDP('5%')
    },
    subContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:heightPercentageToDP('1%')
    },
    text:{
      fontFamily:'Nunito',
      fontSize:heightPercentageToDP('2%')
    }
  })