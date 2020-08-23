import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,

  title3: 20,
};

export const colors = {
  base: '#1A1A1A',
  black: '#000000',
  blueGrey: '#607D8B',
  cloudWhite: '#F2F2F2',
  green: '#4CAF50',
  grey: '#808080',
  hotRed: '#D62828',
  milk: '#FBF9F1',
  orange: '#F77F00',
  orangeRed: '#FF5722',
  primary: '#003049',
  red: '#F2453D',
  separator: '#1a1a1a1a',
  white: '#FFFFFF',
};

export const spaces = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 40,
  xxl: 64,

  appSpacing01: (5 * screenWidth) / 100,

  letterMD: 0.4,
};
