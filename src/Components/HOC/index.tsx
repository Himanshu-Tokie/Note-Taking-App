import React from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from '../../Constants/Colors';

const withTheme = (WrappedComponent) => (props) => {
  const themeMode = useSelector((state) => state.theme.theme);
  const theme = themeMode === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
  return <WrappedComponent {...props} theme={theme} />;
};

export default withTheme;
