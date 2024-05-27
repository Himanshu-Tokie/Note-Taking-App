
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { STRINGS } from '../../Constants/Strings';


export const uploadPhoto = async(photo,uid,noteId) => {
    try {
        const photoName = photo?.split('/').pop();
        console.log(photoName, 90);
        const reference = storage().ref(`${uid}/${photoName}`);
        const uploadTask = await reference.putFile(photo);

        uploadTask.on('state_changed',
            taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            },
            error => {
                console.log(error, 'image error');
                Alert.alert('Photo upload failed', error.message);
            },
            () => {
                console.log('Image uploaded to the bucket!');
                Alert.alert('Photo uploaded successfully');
            }
        );

        const url = await reference.getDownloadURL();
        await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .add({
            url: url
          });
          console.log('All done image');
          
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