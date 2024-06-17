import { HTMLSource } from "react-native-render-html";
import { themeType } from "../HOC";

export interface TimestampType {
  seconds: number;
  nanoseconds: number;
}

export interface NoteType {
  title?: string;
  data?: string | HTMLSource;
  noteId?: string;
  id?: string;
  timestamp?: TimestampType | string;
}

export interface listTemplateTypes {
  note: NoteType;
  nav?: any;
  maxHeight?: number;
  label?: boolean;
  theme: themeType;
}
