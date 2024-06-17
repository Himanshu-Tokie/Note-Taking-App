import { themeType } from "../HOC";

export interface customDialogInputProps{
    isVisible:boolean, 
    onCancel:()=>void,
    onSubmit:(param:string)=>void
    theme:themeType,
}