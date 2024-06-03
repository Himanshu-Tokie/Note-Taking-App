import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { styles } from './style';

export default function CustomButton({text, onPress, disabled = false, style}) {
  // console.log(text);
  const customstyles = style ?? [];
  
  return (
    <View style={{alignItems: 'center',marginTop: heightPercentageToDP('5.5%'),}}>

    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, ...customstyles]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
}
