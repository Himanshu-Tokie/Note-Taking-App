import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:LIGHT_THEME_COLOR.SPLASHSCREEN,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    view:{
        // alignContent:'center',
        // justifyContent:'center'
    },
    indicator:{
        paddingTop:heightPercentageToDP('10%')
    },
    viewText:{
        flexDirection:'row'
    },
    text1:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:LIGHT_THEME_COLOR.TEXT2,
        fontSize:heightPercentageToDP('3.2%')       
    },
    text2:{
        fontFamily:'Nunito', 
        fontWeight:'bold',
        color:LIGHT_THEME_COLOR.TEXT1,
        fontSize:heightPercentageToDP('3.2%')        
    },
    icon:{
        alignItems:'center'
    }
})