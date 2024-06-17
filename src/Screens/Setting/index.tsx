import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "toggle-switch-react-native";
import withTheme from "../../Components/HOC";
import Search from "../../Components/Header";
import { SCREEN_CONSTANTS } from "../../Constants";
import { STRINGS } from "../../Constants/Strings";
import { logIn, updateUser } from "../../Store/Common";
import { toggleTheme } from "../../Store/Theme";
import { styles } from "./style";

function Setting({ navigation, theme }) {
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const THEME = theme;
  const [show, setShow] = useState(false);
  const isThemeOn = useSelector((state) => state.theme.theme);
  const signOut = async () => {
    try {
      if (user?.providerData[0].providerId !== "google.com") {
        await auth()
          .signOut()
          .catch((e) => console.log(e));
        dispatch(logIn(false));
        dispatch(updateUser(null));
        await AsyncStorage.setItem(STRINGS.IS_LOGGED_IN, JSON.stringify(false));
        AsyncStorage.clear();
        navigation.navigate(SCREEN_CONSTANTS.Enter);
      } else {
        try {
          await GoogleSignin.signOut().catch((e) => console.log(e));
          dispatch(logIn(false));
          dispatch(updateUser(null));
          await AsyncStorage.setItem(
            STRINGS.IS_LOGGED_IN,
            JSON.stringify(false)
          )
          AsyncStorage.clear();
          navigation.navigate(SCREEN_CONSTANTS.Enter);
        } catch (error) {
          console.error(error);
        }
      }
      // console.log("data removed to storage logout");
    } catch (e) {
      // console.log(e);
    }
  };

  const SignOutAlert = () => {
    Alert.alert("Sign Out", "Are you sure?", [
      {
        text: "CANCEL",
      },
      {
        text: "OK",
        onPress: () => {
          signOut();
        },
      },
    ]);
  };

  return (
    
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: THEME.BACKGROUND,
          },
        ]}
      >
        <View>
          <Search headerText={STRINGS.SETTINGS} />
        </View>
        <View style={styles.subContainer}>
          <View
            style={[
              styles.box1,
              {
                backgroundColor: THEME.SETTING_BOX,
              },
            ]}
          >
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: THEME.TEXT1,
                    },
                  ]}
                >
                  Profile
                </Text>
              </View>
            </View>
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: THEME.TEXT1,
                    },
                  ]}
                >
                  {STRINGS.THEME}
                </Text>
              </View>
              <View>
                <ToggleSwitch
                  isOn={isThemeOn === "dark"}
                  onColor="black"
                  circleColor={THEME.BACKGROUND1}
                  offColor="white"
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="medium"
                  onToggle={() => dispatch(toggleTheme())}
                />
              </View>
            </View>
            <View style={styles.view}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      color: THEME.TEXT1,
                    },
                  ]}
                >
                  Change Password
                </Text>
              </View>
            </View>
          </View>
          {/* Other settings items */}
          <TouchableOpacity onPress={SignOutAlert}>
            <View
              style={[
                styles.box1,
                styles.box2,
                {
                  backgroundColor: THEME.SETTING_BOX,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: THEME.TEXT1,
                  },
                  // styles.textBold,
                ]}
              >
                {STRINGS.SIGN_OUT}
              </Text>
              {/* </View> */}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    
  );
}
export default withTheme(Setting);
