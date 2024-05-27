import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginTop:heightPercentageToDP('1.5%'),
        borderTopWidth:1.5,
        borderBottomWidth:1.5,
        borderColor:'#B6B0D9'
    },
    text: {
        // borderWth: 1,
        flex: 1,
        paddingHorizontal: widthPercentageToDP('2%'),
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: heightPercentageToDP('2%'),
    },
    icon: {
        padding: heightPercentageToDP('1.5%')
    }
})