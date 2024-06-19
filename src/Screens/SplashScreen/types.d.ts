// import { themeType } from "../../Components/HOC";
// import { StackScreenProps } from "@react-navigation/stack";
// import { RootStackParamList } from "../../Types/navigation";

// export interface SplashProps
//   extends StackScreenProps<RootStackParamList, "Enter"> {
//   theme: themeType;
// }

// src/Screens/SplashScreen/types.ts

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types/navigation';
import { themeType } from '../../Components/HOC';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// export interface SplashProps extends StackScreenProps<RootStackParamList, 'Splash'> {
export interface SplashProps extends NativeStackScreenProps<RootStackParamList, 'splashScreen1'> {
  theme: themeType;
}

