import { themeType } from "../HOC";

export interface dropdownComponentProps{
    data:any,
    value:string, 
    setValue:()=>void,
    theme?:themeType
}