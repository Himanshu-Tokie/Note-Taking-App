import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 18,
      marginHorizontal: widthPercentageToDP('2%'),
      marginBottom: 8,
      padding: 12,
      // alignContent: 'center',
      // justifyContent: 'center',
      // shadowColor: 'rgb(153,144,255)',
      // shadowOffset: { width: -2, height: 4 },
      // shadowOpacity: 0.2,
      // shadowRadius: 3,
      maxHeight: heightPercentageToDP('15%'),
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: 'bold',
      fontFamily: 'Nunito',
      fontSize: RFValue(12),
      paddingBottom: 4,
    },
    // data: {
    //   fontFamily: 'Nunito',
    //   fontSize: RFValue(10),
    //   color: COLORS.NOTETEXT,
    //   // overflow: 'hidden',
    // },
    touch: {
      // flex: 1,
    },
  });
  