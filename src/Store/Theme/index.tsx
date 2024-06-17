import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionCreatorWithPayload, Dispatch, UnknownAction, createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const initialState = {
  theme: 'light', // default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem('appTheme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('appTheme', state.theme);
    },
    loadTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeApprearance:(state)=>{
      Appearance.setColorScheme('light')
    }
  },
});

export const { setTheme, toggleTheme, loadTheme ,changeApprearance } = themeSlice.actions;

export const loadThemeFromStorage = () => async (dispatch) => {
  const savedTheme = await AsyncStorage.getItem('appTheme');
  if (savedTheme) {
    dispatch(loadTheme(savedTheme));
  }
};

export default themeSlice.reducer;
