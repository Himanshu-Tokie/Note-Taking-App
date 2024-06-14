export interface formikTemplateTypes{
  placeholder:string,
  values:string,
  touched:FormikTouched<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    number: string;
}>,
  onChangeText:(e:string)=>void,
  onBlur:()=>Promise<void | FormikErrors<{ firstName: string; lastName: string; email: string; password: string; confirmPassword: string; number: string; }>> | void,
  error:string|undefined,
  logIn?:boolean
}