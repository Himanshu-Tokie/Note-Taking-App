import { Text, View } from "react-native";
import { style } from "./style";
import { textTypes } from "./types";

export default function CustomText({text,styles}:textTypes){
    const customstyles = styles??[]

    return(
        <View style={[style.container,...customstyles]}>
            <Text style={[style.text,...customstyles]}>{text}</Text>
        </View>
    )
}