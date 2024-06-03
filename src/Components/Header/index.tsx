import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { LIGHT_THEME_COLOR } from '../../Constants/Colors';
import { ICONS } from '../../Constants/Icons';
import withTheme from '../HOC';
import Icon from '../Icon';
import { styles } from './style';

 function Header({
  onChangeText,
  notesData,
  setSearchData,
  headerText,
  theme
}) {
  const navigation = useNavigation();
  const [isFocussed, setIsFocused] = useState(false);
  // console.log(isFocussed);
  const [value,setValue] = useState('')
  const THEME = theme
  const label = ()=>{
    if(!headerText)
      return headerText
      if(headerText.length>12)
        return headerText.slice(0,10)+'...'
      else 
      return headerText
  }
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.leftHeader}>
            {ICONS.BACK(23, 23, 'none')}
            {/* <Icon icon={ICONS.BACK} height={23} width={23} color='none' /> */}
            <Text style={[styles.text]}>Back</Text>
          </View>
        </Pressable>
        {!isFocussed && (
          <View>
            <Text style={[styles.headerText,{color:THEME.TEXT4}]}>{label()}</Text>
          </View>
        )}
        <View
          style={[styles.rightHeader, isFocussed && styles.rightHeaderFocused]}>
          {setSearchData && (
            <TouchableOpacity style={styles.searchContainer}>
              {!isFocussed && (
                <Icon
                  icon={ICONS.SEARCH}
                  height={23}
                  width={23}
                  color="none"
                  style={styles.iconContainer}
                />
              )}
              <TextInput
                style={[styles.text,{paddingTop:0}]}
                placeholder="Search"
                value={value}
                placeholderTextColor={LIGHT_THEME_COLOR.HEADER}
                onChangeText={text=>{onChangeText(text);setValue(text)}}
                onFocus={() => {
                  setIsFocused(true);
                  console.log('focus');
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setSearchData(notesData);
                  console.log('blur');
                  setValue('')
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

export default withTheme(Header)