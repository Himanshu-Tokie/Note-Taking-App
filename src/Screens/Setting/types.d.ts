import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, RootStackParamList, RootTabParamList } from "../../Types/navigation";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export interface themeState{
    theme:{theme:string}
}

export interface SettingProps extends HomeTabScreenProps<'setting'> {
    theme: themeType;
  }