// signup
import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:LIGHT_THEME_COLOR.BACKGROUND,
        flex:1,
    },

    subContainer:{
        paddingTop:heightPercentageToDP('3%'),
        alignItems:'center',
        paddingBottom:heightPercentageToDP('3%')
        // marginHorizontal:0
        // alignContent:'center',
        // justifyContent:'center'
    },
    text:{
        color:LIGHT_THEME_COLOR.TEXT1,
        fontFamily:'Nunito'
    }
})