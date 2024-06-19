import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LIGHT_THEME_COLOR } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    backgroundColor: LIGHT_THEME_COLOR.BACKGROUND,
    },
    searchContainer:{
        // maxWidth:RFPercentage(50),
        // width:"50%",
        // width:100
        paddingTop:heightPercentageToDP('0%')
    },
    subContainer:{
       paddingBottom:heightPercentageToDP('27%') 
    },
    addNotes:{
        position:'absolute',
        bottom:40,
        left:'25%'
    },
    customButton:{
        width:200
    },
    noReminder:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        paddingBottom:heightPercentageToDP('10%')
    },
    noReminderText:{
        textAlign:'center',
        fontFamily:'Nunito',
        fontSize:heightPercentageToDP('2.5'),
        fontWeight:'bold'
    }
})

