import { StyleSheet } from "react-native";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";
// customText
export const style = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
    },
    text:{
        fontSize:20,
        color:LIGHT_THEME_COLOR.TEXT1,
        // fontWeight:'bold'
    }
})