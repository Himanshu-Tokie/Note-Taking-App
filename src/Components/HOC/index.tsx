// import React from 'react';
// import { useSelector } from 'react-redux';
// import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from '../../Constants/Colors';
// import { themeState } from './types';

// export default function withTheme<P>(WrappedComponent:React.FC<P>){
//   const ComponentWithTheme = (props: P) => {
//     const themeMode = useSelector((state:themeState) => state.theme.theme);
//     const theme = themeMode === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
//     return <WrappedComponent {...props} theme={theme} />;
//   }
//   return ComponentWithTheme;
// };

// export type themeType = typeof LIGHT_THEME_COLOR


// src/Components/HOC/withTheme.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { themeState } from './types';
import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from '../../Constants/Colors';

export type themeType = typeof LIGHT_THEME_COLOR;

export interface WithThemeProps {
  theme: themeType;
}

export default function withTheme<P extends WithThemeProps>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithTheme: React.FC<Omit<P, 'theme'>> = (props) => {
    const themeMode = useSelector((state: themeState) => state.theme.theme);
    const theme = themeMode === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
    return <WrappedComponent {...(props as P)} theme={theme} />;
  };
  return ComponentWithTheme;
}


