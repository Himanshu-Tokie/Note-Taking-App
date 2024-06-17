import { labelNotesDataType } from "../../Screens/Labels/types";
import { reminderNotesDataType } from "../../Screens/Reminder/types";
import { WithThemeProps, themeType } from "../HOC";

export interface headerTypes extends WithThemeProps{
  onChangeText?:(e:string)=>void,
  notesData?:reminderNotesDataType|labelNotesDataType|null,
  headerText:string,
  // theme?:themeType,
  handleSetInittialOnBlur?: () => void
}