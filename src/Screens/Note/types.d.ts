import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, RootStackParamList } from "../../Types/navigation";
import { HomeNavigationProps } from "../../Navigation/HomeNavigation/types";

export interface imageState{
    image:{
        imageUri:{
            [key:string]:string[]
        }
    }
}

export interface NoteProps extends NativeStackScreenProps<RootStackParamList, 'note'> {
    theme: themeType;
  }

export interface HomeNoteProps extends HomeTabScreenProps<'note'> {
    theme: themeType;
  }
