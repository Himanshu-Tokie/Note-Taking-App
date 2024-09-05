import { themeType } from "../HOC";
export interface addLabelProps{
    uid:string|undefined,
    setShow:(flag:boolean)=>void,
    show:boolean,
    theme:themeType
} 