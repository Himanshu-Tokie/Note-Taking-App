
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { STRINGS } from '../../Constants/Strings';

import firestore from '@react-native-firebase/firestore';

export const uploadPhoto = async(photo,uid,noteId) => {
    try {
        if(!photo.length)
            return
        console.log(photo,90);
        
        let photoUrls = [];
        for (const item of photo) {
            const photoName = item.split('/').pop();
            const folder = `${uid}/${noteId}/${photoName}`;
            const reference = storage().ref(folder);
      
            await reference.putFile(item);
            const url = await reference.getDownloadURL();
            photoUrls.push(url);
          }
        // uploadTask.on('state_changed',
        //     taskSnapshot => {
        //         console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        //     },
        //     error => {
        //         console.log(error, 'image error');
        //         Alert.alert('Photo upload failed', error.message);
        //     },
        //     () => {
        //         console.log('Image uploaded to the bucket!');
        //         Alert.alert('Photo uploaded successfully');
        //     }
        // );

                
        // update image data
        const ImageUrls = await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .get()
        // console.log(ImageUrls.doc());
        photoUrls = [...ImageUrls.data().url,...photoUrls]

        await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .update({
            url: photoUrls
          });
          console.log('All image uploaded to firebase');
          
    } catch (e) {
        console.log(e, 'image error');
        Alert.alert('Photo upload failed', e.message);
    }
}

const syncPhotos = async (dispatch, photos) => {
    // photos from store queue
    for (const photo of photos) {

      dispatch(removePhoto(hash));
    } 
    await AsyncStorage.removeItem('photos');
  };