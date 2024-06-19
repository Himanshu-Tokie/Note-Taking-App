import { TouchableOpacity } from 'react-native';
import { iconType } from './types';

export default function Icon({
  icon,
  width,
  height,
  color,
  action,
  borderColor,
}:iconType) {

  return (
    
      <TouchableOpacity onPress={action}>
        {icon(width, height, color, borderColor)}
      </TouchableOpacity>
    
  );
}

