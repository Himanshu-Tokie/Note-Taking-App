import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: widthPercentageToDP('2%'),
      marginVertical: heightPercentageToDP('1.5%'),
    },
    searchContainer: {
      flexDirection: 'row',
      // justifyContent:'space-between',
      marginHorizontal: widthPercentageToDP('2%'),
      // flex:1
    },
    rightHeaderFocused: {
      flex: 1,
      marginLeft: widthPercentageToDP('2%'),
    },
    headerText: {
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: heightPercentageToDP('2.2%'),
      marginLeft: 10,
      color: LIGHT_THEME_COLOR.TEXT1,
      // marginHorizontal:60
    },
    leftHeader: {
      flexDirection: 'row',
    },
    rightHeader: {
      width: widthPercentageToDP('25%'),
      // flex:()
      // flex:1,
    },
    text: {
      fontSize: heightPercentageToDP('2%'),
      color: LIGHT_THEME_COLOR.TEXT4,
      paddingTop: 2,
      fontFamily: 'Nunito',
    },
    iconContainer: {
      paddingRight: 5,
    },
  });
  