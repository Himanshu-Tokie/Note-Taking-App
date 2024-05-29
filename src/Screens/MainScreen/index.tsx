import React from 'react';
import { Text, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../Components/Button/customButton';
import withTheme from '../../Components/HOC';
import CustomText from '../../Components/Text';
import { ICONS } from '../../Constants/Icons';
import { SCREEN_CONSTANTS } from '../../Constants/index';
import { STRINGS } from '../../Constants/Strings';
import Google from './google';
import { styles } from './style';

function Enter({ navigation,theme }) {
  const THEME = theme  
  const onPress = () => {
    navigation.navigate(SCREEN_CONSTANTS.SignUp);
  };
  const logIn = () => {
    navigation.navigate(SCREEN_CONSTANTS.Login);
  };
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
            {' ' +STRINGS.LOG_IN}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(Enter)