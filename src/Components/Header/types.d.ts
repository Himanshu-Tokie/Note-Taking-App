import { labelNotesDataType } from "../../Screens/Labels/types";
import { reminderNotesDataType } from "../../Screens/Reminder/types";
import { themeType } from "../HOC";

export interface headerTypes{
  onChangeText?:(e:string)=>void,
  notesData?:reminderNotesDataType|labelNotesDataType|null,
  headerText:string,
  theme?:themeType,
  handleSetInittialOnBlur?: () => void
}