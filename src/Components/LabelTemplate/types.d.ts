import { themeType } from "../HOC"

export interface colorSchemeState{
    theme:{
        theme:string
    }
}

export interface labelTemplateTypes{
    icon:(...params: any[]) => React.JSX.Element, 
    text:string,
    files:number,
    note:string,
    theme:themeType
}