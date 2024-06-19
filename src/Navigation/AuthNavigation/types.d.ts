import { themeType } from "../../Components/HOC"

export interface imageState{
    image:{isConnected:boolean}
}
export interface commonState{
    common:{isLogedIn:boolean}
}

export interface authNavigationProps{
    theme:themeType
}