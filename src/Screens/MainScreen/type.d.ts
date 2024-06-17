import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export interface isConnectedState{
    image:{
        isConnected:boolean
    }
}

export interface colorSchemeState{
    theme:{
        theme:string
    }
}

export interface EnterProps extends NativeStackScreenProps<RootStackParamList, 'enter'> {
    theme: themeType;
  }