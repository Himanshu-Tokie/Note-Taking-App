import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { ICONS } from '../../Constants/Icons';


export default function UserImage({photo,setPhoto}) {
  

  const handleImagePicker = () => {
    async function launch() {
      const response = await launchImageLibrary();
      if (response.didCancel) {
        // console.log('User cancelled image picker', 1);
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error, 2);
      } else {
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

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  updateText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    margin: 20,
    alignItems: 'center',
  },
});
