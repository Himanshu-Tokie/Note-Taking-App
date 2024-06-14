import { themeType } from "../HOC";
export interface addLabelProps{
    uid:string,
    setShow:(flag:boolean)=>void,
    show:boolean,
    theme:themeType
} 