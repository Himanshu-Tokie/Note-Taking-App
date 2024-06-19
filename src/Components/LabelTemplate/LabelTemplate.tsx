import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { SCREEN_CONSTANTS } from '../../Constants';
import { DEVICE_THEME } from '../../Constants/Colors';
import { IMAGES } from '../../Constants/Images';
import { RootStackParamList, RootStackScreenProps } from '../../Types/navigation';
import withTheme from '../HOC';
import { styles } from './style';
import { colorSchemeState, labelTemplateTypes } from './types';

function LabelTemplate({icon, text, files, note,theme}:labelTemplateTypes) {
  const nav = useNavigation<RootStackScreenProps<keyof RootStackParamList>>();
  const colorScheme = useSelector((state:colorSchemeState)=>state.theme.theme)
  const THEME = theme ;
  
  const label = (text:string)=>{
    if(!text.length)return ''
    else {
      if(text.length>8)
        return text.slice(0,8)+'...'
      else 
      return text
    }
  }
  function navigationHandler() {
    nav.navigate(SCREEN_CONSTANTS.Label, { text, note });
  }
  return (
    
      <View style={styles.sub}>
        <ImageBackground
          source={colorScheme===DEVICE_THEME.LIGHT? IMAGES.LABEL:IMAGES.DARK_LABEL}
          resizeMode="cover"
          style={styles.container}>
          <TouchableOpacity onPress={navigationHandler}>
            <View style={styles.inner}>
              {icon(heightPercentageToDP('6.2%'), heightPercentageToDP('6.2%'))}
              <Text style={[styles.text,{color:THEME.TEXT1}]}>{label(text)}</Text>
              <Text style={{color:THEME.TEXT1}}>{files}{files<=1? ' File':' Files'}</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    
  );
}
export default withTheme(LabelTemplate)


