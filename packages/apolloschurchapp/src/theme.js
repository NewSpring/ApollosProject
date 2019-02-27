const colors = {
  // Brand Colors
  primary: '#6bac43',
  secondary: '#6bac43',
  tertiary: '#2a4930',
  screen: '#F8F7F4',
  paper: '#ffffff',
  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#505050',
  darkTertiary: '#858585',
  // Light shades
  lightPrimary: '#ffffff',
  lightSecondary: '#f7f7f7',
  lightTertiary: '#dddddd',
  // Statics
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',

  alert: '#c64f55',
  wordOfChrist: '#8b0000',
};

const typography = {
  baseFontSize: 16,
  baseLineHeight: 23.04, // 1.44 ratio
  sans: {
    regular: {
      default: 'Colfax-Regular',
      italic: 'Colfax-RegularItalic',
    },
    medium: {
      default: 'Colfax-Medium',
      italic: 'Colfax-MediumItalic',
    },
    bold: {
      default: 'Colfax-Bold',
      italic: 'Colfax-BoldItalic',
    },
    black: {
      default: 'Colfax-Black',
      italic: 'Colfax-BlackItalic',
    },
  },
};

export default {
  colors,
  typography,
};
