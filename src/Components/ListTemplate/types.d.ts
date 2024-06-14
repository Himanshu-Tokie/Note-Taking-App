import { themeType } from "../HOC";

export interface TimestampType {
  seconds: number;
  nanoseconds: number;
}

export interface NoteType {
  title?: string;
  data?: string;
  noteId?: string;
  id?: string;
  timestamp?: TimestampType;
}

export interface listTemplateTypes {
  note: NoteType;
  nav?: any;
  maxHeight?: number;
  label?: boolean;
  theme: themeType;
}
