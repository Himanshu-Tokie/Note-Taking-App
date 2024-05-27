import { Platform, StyleSheet } from "react-native";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    container: {
      // height: 150,
      // width: 150,
      backgroundColor:LIGHT_THEME_COLOR.BACKGROUND1,
      position:'absolute',
      bottom:14,
      padding:5,
      borderRadius:8,
      // right:2,
      left:-22,
      shadowColor: 'rgb(153,144,255)',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 10,
        },
      }),
    },
  });