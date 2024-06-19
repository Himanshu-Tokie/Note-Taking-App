import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Types/navigation";

export type labelNotesDataType = {
    'title':string,
    'data':string,
    'id':string,
    'noteId':string,
    'label':string,
    'ImageUrl':string[]
}[]

export interface LabelProps extends NativeStackScreenProps<RootStackParamList, 'label'> {
    theme: themeType;
  }