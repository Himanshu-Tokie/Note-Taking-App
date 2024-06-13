import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { STRINGS } from '../../Constants/Strings';

import firestore from '@react-native-firebase/firestore';

export const uploadPhoto = async(photo,uid,noteId) => {
    try {
        if(!photo.length)
            return
        
        let photoUrls = [];
        for (const item of photo) {
            const photoName = item.split('/').pop();
            const folder = `${uid}/${noteId}/${photoName}`;
            const reference = storage().ref(folder);
      
            await reference.putFile(item);
            const url = await reference.getDownloadURL();
            photoUrls.push(url);
          }
        const ImageUrls = await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .get()
        photoUrls = [...(ImageUrls.data()?.url),...photoUrls]

        await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .update({
            url: photoUrls
          });
          // console.log('All image uploaded to firebase');
          
    } catch (e:any) {
        Alert.alert('Photo upload failed', e.message);
    }
}