import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, RootStackParamList, RootTabParamList } from "../../Types/navigation";
import { HomeNavigationProps } from "../../Navigation/HomeNavigation/types";
import { CompositeScreenProps, RouteProp } from "@react-navigation/native";
import { themeType } from "../../Components/HOC";

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

type NoteRouteProp = RouteProp<RootStackParamList, 'note'> | RouteProp<RootTabParamList, 'note'>;
type NoteNavigationProp = CompositeScreenProps<
StackNavigationProp<RootStackParamList, 'note'>,
HomeTabScreenProps<'note'>
>;

export type NoteScreenProps = CompositeScreenProps<
BottomTabScreenProps<RootTabParamList, 'note'>,
NativeStackScreenProps<RootStackParamList>
> & {
theme: themeType;
};
