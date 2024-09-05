import { themeType } from "../HOC";

export interface dateTimeProps{
    date:Date, 
    setDate:(date:Date)=>void,
    theme:themeType
}