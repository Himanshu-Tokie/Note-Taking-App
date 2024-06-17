import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/navigation";

export interface valuesTypes{
    email:string,
    password:string,
    firstName:string,
    lastName:string,
}

export interface SignUpProps extends NativeStackScreenProps<RootStackParamList, 'SignUp'> {
    theme: themeType;
  }