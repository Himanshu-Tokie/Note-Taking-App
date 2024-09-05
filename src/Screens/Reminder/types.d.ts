import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, RootStackParamList, RootTabParamList } from "../../Types/navigation";

export interface reminderFormate {
  data: string;
  title: string;
}

export type reminderNotesDataType = {
  title: string;
  data: string;
  noteId: string;
  id: string;
  timestamp: string;
}[]

export interface ReminderProps extends HomeTabScreenProps<'extra2'> {
  theme: themeType;
}