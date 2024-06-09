import { TouchableOpacity } from 'react-native';

export default function Icon({
  icon,
  width,
  height,
  color,
  action,
  borderColor,
  style,
}) {
  const iconContainer = style ?? [];

  return (
    
      <TouchableOpacity onPress={action} style={iconContainer}>
        {icon(width, height, color, borderColor)}
      </TouchableOpacity>
    
  );
}
