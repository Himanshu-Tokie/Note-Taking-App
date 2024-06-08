import { Text, TextInput } from "react-native";

export default function CustomInput({setText,style,placeholder,text}){
    // const [text,setText] = useState();
    return(
       {text && <Text>{text}</Text>}
            <TextInput onChangeText={setText} style={style} placeholder={placeholder}></TextInput>       
    )
}