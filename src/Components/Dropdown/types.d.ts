
import { LabelData } from "../../Navigation/HomeNavigation/types";
import { labelNotesDataType } from "../../Screens/Labels/types";
import { WithThemeProps, themeType } from "../HOC";


export interface dropdownComponentProps extends WithThemeProps{
    data:LabelData,
    value:string, 
    setValue:(key:string)=>void,
    // theme?:themeType
}