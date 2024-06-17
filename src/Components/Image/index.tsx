import React from 'react';
import { TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ICONS } from '../../Constants/Icons';
import { userImageProps } from './types';


export default function UserImage({photo,setPhoto}:userImageProps) {
  const handleImagePicker = () => {
    async function launch() {
      const response = await launchImageLibrary({
        mediaType:'photo'
      });
      if (response.didCancel) {
        // console.log('User cancelled image picker', 1);
      }
      //  else if (response.error) {
        // console.log('ImagePicker Error: ', response.error, 2);
      // }
       else {
        if(response.assets)
        setPhoto(response.assets[0].uri);
      }
    }
    launch();
  };

  return (
    
    <TouchableOpacity onPress={handleImagePicker}>
      {ICONS.CAMERA(
        heightPercentageToDP('2.8%'),
        heightPercentageToDP('2.8%'),
        'none',
      )}
      </TouchableOpacity>
    
  );
}

