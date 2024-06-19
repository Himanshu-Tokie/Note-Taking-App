import React from 'react';
import { useSelector } from 'react-redux';
import { DARK_THEME_COLOR, DEVICE_THEME, LIGHT_THEME_COLOR } from '../../Constants/Colors';
import { themeState } from './types';

export type themeType = typeof LIGHT_THEME_COLOR;

export interface WithThemeProps {
  theme: themeType;
}

export default function withTheme<P extends WithThemeProps>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithTheme: React.FC<Omit<P, 'theme'>> = (props) => {
    const themeMode = useSelector((state: themeState) => state.theme.theme);
    const theme = themeMode === DEVICE_THEME.LIGHT ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
    return <WrappedComponent {...(props as P)} theme={theme} />;
  };
  return ComponentWithTheme;
}


