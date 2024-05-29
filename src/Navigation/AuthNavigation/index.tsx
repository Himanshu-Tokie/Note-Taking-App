import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from "react-redux";
import withTheme from "../../Components/HOC";
import { SCREEN_CONSTANTS } from "../../Constants";
import ForgotPassword from "../../Screens/ForgotPassword";
import Label from "../../Screens/Labels";
import LogIn from "../../Screens/LogIn";
import Enter from "../../Screens/MainScreen";
import Note from "../../Screens/Note";
import SignUp from "../../Screens/SignUp";
import Splash from "../../Screens/SplashScreen";
import { setConnectionStatus } from "../../Store/Image";
import { loadThemeFromStorage } from "../../Store/Theme";
import HomeNavigation from "../HomeNavigation";

function AuthNavigation({theme}) {
    const isConnected = useSelector(state=>state.image.isConnected)
    const isLoggedIn = useSelector(state=>state.common.isLogedIn)   
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadThemeFromStorage());
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(setConnectionStatus(state.isConnected));
            if (state.isConnected) {
            //   syncPhotos(dispatch, photos);
            console.log(state.isConnected,82);
            }
          });
      
          return () => {
            unsubscribe();
          };
        }, [dispatch]);
      
        useEffect(() => {
            console.log('Network connection status:', isConnected);
            if (isConnected) {
                // Sync photos if neede
                // syncPhotos(dispatch, photos);
                console.log(isConnected,98);
                
            }
        }, [isConnected]);
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={SCREEN_CONSTANTS.Splash1}
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.BACKGROUND ,
                            
                        },
                        headerTitleAlign:'center',
                        headerTintColor: 'rgb(107, 78, 253)',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color:theme.TEXT1,
                            fontSize: heightPercentageToDP('3%')
                        },
                    }}>
                        {!isLoggedIn ? (
                    <>
                        <Stack.Screen name={SCREEN_CONSTANTS.Splash1} component={Splash} options={{ headerShown: false }} />
                        <Stack.Screen name={SCREEN_CONSTANTS.Enter} component={Enter} options={{ headerShown: false }} />
                        <Stack.Screen name={SCREEN_CONSTANTS.Login} component={LogIn} />
                        <Stack.Screen name={SCREEN_CONSTANTS.SignUp} component={SignUp} />
                        <Stack.Screen name={SCREEN_CONSTANTS.ForgotPassword} component={ForgotPassword} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name={SCREEN_CONSTANTS.HomeNavigation} component={HomeNavigation} options={{ headerShown: false }} />
                        <Stack.Screen name={SCREEN_CONSTANTS.Note} component={Note} options={{ headerShown: false }} />
                        <Stack.Screen name={SCREEN_CONSTANTS.Label} component={Label} options={{ headerShown: false }} />
                    </>
                )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
export default withTheme(AuthNavigation)