import { useNavigation } from "@react-navigation/native"
import { HomeTabScreenProps } from "../../Types/navigation"
import { themeType } from "../HOC"

export interface colorSchemeState{
    theme:{
        theme:string
    }
}

export interface myTabBarProps{
    state,
    descriptors,
    navigation:any,
    parentNavigation:Omit<
    NavigationProp<ReactNavigation.RootParamList>,
    "getState"
  >,
    theme:themeType,
    setShow:(key:boolean)=>void,
    labelData:any,
}