import { useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';
import { ICONS } from '../../Constants/Icons';
import { STRINGS } from '../../Constants/Strings';
import { styles } from './style';

export default function FormikTemplate({
  placeholder,
  values,
  touched,
  onChangeText,
  onBlur,
  error,
  logIn = true
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [show, setShow] = useState(true);
  useMemo(()=>{

    if (
      (placeholder === STRINGS.PASSWORD || placeholder === STRINGS.CONFIRM_PASSWORD) &&
      show
    ) {
      setSecureTextEntry(true);
      setShow(false);
    }
  },[placeholder])
    const onPress = () => {
    setSecureTextEntry(!secureTextEntry);
    setShow(!show);
  };
  return (
    <View style={styles.container}>
      {placeholder && <Text style={styles.label}>{placeholder}</Text>}
      <View style={styles.eye}>
        <TextInput
          placeholder={(placeholder == STRINGS.CONFIRM_PASSWORD) ? placeholder : ('Enter your ' + placeholder)}
          placeholderTextColor='#000000'
          autoCapitalize="none"
          value={values}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          style={{flex:1,color:LIGHT_THEME_COLOR.TEXT1}}
        />
        <View style={styles.icon}>
        {(placeholder === STRINGS.PASSWORD || placeholder === STRINGS.CONFIRM_PASSWORD) && ( 
          <TouchableOpacity onPress={onPress}>
            {
              secureTextEntry ?
              ICONS.EYE(heightPercentageToDP('2.2'), heightPercentageToDP('2.2'), 'none'):ICONS.EYE_CLOSE(heightPercentageToDP('2.2'), heightPercentageToDP('2.2'), 'none')
            }
          
          </TouchableOpacity>
        )}
        </View>
      </View>
      {touched && error &&(logIn)&& <Text style={styles.error}>*{error}</Text>}
    </View>
  );
}
