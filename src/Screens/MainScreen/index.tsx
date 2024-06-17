import React, { useEffect, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import CustomButton from '../../Components/Button/customButton';
import withTheme from '../../Components/HOC';
import CustomText from '../../Components/Text';
import { ICONS } from '../../Constants/Icons';
import { STRINGS } from '../../Constants/Strings';
import { SCREEN_CONSTANTS } from '../../Constants/index';
import Google from './google';
import { styles } from './style';
function Enter({ navigation,theme }) {
  const isLoggedIn = useSelector(state=>state.common.isLogedIn)   
  // console.log(isLoggedIn,0);
  const THEME = theme  
  const isConnected = useSelector(state=>state.image.isConnected)
  // console.log(isConnected,97);
  const isOffline = useRef(!isConnected)
  const onPress = () => {
    navigation.navigate(SCREEN_CONSTANTS.SignUp);
  };
  const logIn = () => {
    navigation.navigate(SCREEN_CONSTANTS.Login);
  };
  // const checkConnection = ()=>{
  //   if(isConnected)return                               
  //   if(!isConnected)
  //     Alert.alert(
  //       "No Internet Connection",
  //       "Please check your internet connection and try again.",
  //       [{ text: "OK", onPress: ((isConnected)=> {if(isConnected)return checkConnection()}) }]
  //     );
  // }
  // useEffect(()=>{
  //   if(!isConnected){
  //     checkConnection();
  //   }
  // },[isConnected])
  
  const checkConnection = () => {    
    if(isOffline.current){console.log('wow');
     return}
    else {     
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again.",
        [
          {
            text: "OK",
            onPress: () => {
              checkConnection()
            },
          },
        ]
      );
    }
  };
  
  useEffect(() => {
    isOffline.current = !isOffline.current
    checkConnection();
  }, [isConnected]);
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:THEME.BACKGROUND}]}>
      <View style={styles.subContainer}>
        <View style={styles.viewText}>
            <Text style={[styles.text1,styles.font]}>{STRINGS.NOTE_TAKING_APP.PART1}</Text>
            <Text style={[styles.text2,styles.font,{color:THEME.TEXT1}]}>{STRINGS.NOTE_TAKING_APP.PART2}</Text>
          </View>
        <View style={styles.svg}>
          {ICONS.DAIRY(widthPercentageToDP('60'),heightPercentageToDP('25'),)}
        </View>
        <CustomText
          text={STRINGS.SAVE_SHARE_NOTES}
          styles={[styles.textSave, styles.font,{color:THEME.TEXT1}]}
        />
        <CustomButton text={STRINGS.CREATE_ACCOUNT} onPress={onPress}/>
        <Google></Google>
        <View style={styles.footer}>
          <CustomText text={STRINGS.HAVE_ACCOUNT} styles={[styles.simpleText,{color:THEME.TEXT1}]} />
          <Text onPress={logIn} style={[styles.simpleText, styles.colorText]}>
            {'  ' +STRINGS.LOG_IN}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(Enter)