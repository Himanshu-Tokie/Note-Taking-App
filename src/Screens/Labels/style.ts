import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";
export const styles = StyleSheet.create({
    container:{
        flex: 1,
    backgroundColor: LIGHT_THEME_COLOR.BACKGROUND,
    },
    subContainer:{
        // maxWidth:RFPercentage(50),
        // width:"50%",
        // width:100
        paddingTop:heightPercentageToDP('3%'),
        paddingBottom:heightPercentageToDP('6%'),
        flex:1
    },
    list:{
        
    },
    addNotes:{
        position:'absolute',
        bottom:40,
        left:'25%'
    },
    customButton:{
        width:200
    }
})

