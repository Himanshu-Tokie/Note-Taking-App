export interface customDialogInputProps{
    isVisible:boolean, 
    onCancel:()=>void,
    theme:themeType,
    onSubmit:(param:string)=>void
}