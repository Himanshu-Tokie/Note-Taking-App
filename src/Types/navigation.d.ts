import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { themeType } from "../Components/HOC";
import { SCREEN_CONSTANTS } from "../Constants";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type theme = {
  theme: themeType;
};

export type RootStackParamList = {
  [SCREEN_CONSTANTS.Splash]: undefined;
  [SCREEN_CONSTANTS.Enter]: undefined;
  [SCREEN_CONSTANTS.Login]: undefined;
  [SCREEN_CONSTANTS.SignUp]: undefined;
  [SCREEN_CONSTANTS.ForgotPassword]: undefined;
  [SCREEN_CONSTANTS.HomeNavigation]: NavigatorScreenParams<RootTabParamList>;
  [SCREEN_CONSTANTS.Note]: {
    note: {
      uid: string;
      label: string;
    };
  };
  [SCREEN_CONSTANTS.Label]: {
    note: string;
    text: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
  [SCREEN_CONSTANTS.Home]: undefined;
  [SCREEN_CONSTANTS.Extra1]: undefined;
  [SCREEN_CONSTANTS.Note]: {
    labelData:{

    },
    note:{
      noteId:string,
      title:string,
      data:string,
      label:string,
      timestamp:FirebaseFirestoreTypes.Timestamp;
      newReminder:string
    }
  };
  [SCREEN_CONSTANTS.Extra2]: {
    parentNavigation: Omit<
      NavigationProp<ReactNavigation.RootParamList>,
      "getState"
    >;
  };
  [SCREEN_CONSTANTS.Setting]: undefined;
};

export type HomeTabScreenProps<T extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends HomeTabScreenProps {}
    }
  }
