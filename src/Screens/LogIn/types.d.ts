import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { STRINGS } from "../../Constants/Strings"
import { RootStackParamList } from "../../Types/navigation";

export interface commonState{
    common:{
        [STRINGS.IS_LOGGED_IN]:boolean;
    };
}

export interface commonState {
  common: {
    [STRINGS.IS_LOGGED_IN]: boolean;
  };
}

export interface LogInProps extends NativeStackScreenProps<RootStackParamList, 'Login'> {
  theme: themeType;
}