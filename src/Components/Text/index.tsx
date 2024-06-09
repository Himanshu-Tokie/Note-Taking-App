import { Text, View } from "react-native";
import { style } from "./style";

export default function CustomText({text,styles}){
    const customstyles = styles??[]

    return(
        <View style={[style.container,...customstyles]}>
            <Text style={[style.text,...customstyles]}>{text}</Text>
        </View>
    )
}