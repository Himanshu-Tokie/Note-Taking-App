import { themeType } from "../Components/HOC";
import { SCREEN_CONSTANTS } from "../Constants";

type theme = {
    theme:themeType
}

export type RootStackParamList = {
    [SCREEN_CONSTANTS.Splash]: {
        theme:themeType
    };
    [SCREEN_CONSTANTS.Enter]: undefined;
    [SCREEN_CONSTANTS.Login]: undefined;
    [SCREEN_CONSTANTS.SignUp]: undefined;
    [SCREEN_CONSTANTS.ForgotPassword]: undefined;
    [SCREEN_CONSTANTS.HomeNavigation]: undefined;
    [SCREEN_CONSTANTS.Note]: undefined;
    [SCREEN_CONSTANTS.Label]: undefined;
  };

  ScreenComponentType<RootStackParamList, "SignUp"> | undefined