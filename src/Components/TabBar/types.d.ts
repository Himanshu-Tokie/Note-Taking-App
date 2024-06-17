import { useNavigation } from "@react-navigation/native"
import { HomeTabScreenProps } from "../../Types/navigation"
import { themeType } from "../HOC"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

export interface colorSchemeState{
    theme:{
        theme:string
    }
}

export interface myTabBarProps{
    state:BottomTabBarProps.state,
    descriptors,
    navigation:BottomTabScreenProps<RootTabParamList>,
    parentNavigation:Omit<
    NavigationProp<ReactNavigation.RootParamList>,
    "getState"
  >,
    theme:themeType,
    setShow:(key:boolean)=>void,
    labelData:any,
}