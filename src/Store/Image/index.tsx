import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { uploadPhoto } from '../../Utils/Images/image';

const image = createSlice({
  name: 'image',
  initialState: {
    imageUri: {},
    isConnected:false,
    queuedImage:{}
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    loadImage: (state, action) => {
      const noteId = action.payload.noteId;
      const uri = action.payload.uri;
      const uid = action.payload.uid;
      console.log(uri, 8);
      console.log(noteId);
      if (state.imageUri.hasOwnProperty(noteId)) {
        const imageData = state.imageUri;
        imageData[noteId] = [...imageData[noteId], ...uri];
        state.imageUri = imageData;
      } else {
        console.log('else image');
        const imageData = state.imageUri;
        imageData[noteId] = uri;
        state.imageUri = imageData;
        
      }
      AsyncStorage.setItem('Saved_Images', JSON.stringify(state.imageUri)).then(()=>{console.log('done');
      });
      uploadPhoto(uri,uid,noteId)
      console.log(state.imageUri, 'all image saved');
    },
    deleteImage: (state, action) => {},
    getFromAsyncStorage: (state, action) => {
      state.imageUri = action.payload ?? {};
      // console.log(action.payload,67);
    },
  },
});
// export const loadImageFromStorage = () => async dispatch => {
//   const savedImage = await AsyncStorage.getItem('Images');
//   if (savedImage) {
//     dispatch(getFromAsyncStorage(savedImage));
//   }
// };

export const {loadImage, getFromAsyncStorage,setConnectionStatus} = image.actions;

export default image.reducer;
