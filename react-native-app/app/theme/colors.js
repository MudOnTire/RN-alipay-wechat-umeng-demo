/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

const app = {
  theme: '#4b3333',
  background: '#fafafa',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
  transparent: 'rgba(0, 0, 0, 0)',
};

const navibar = {
  navibar: {
    background: '#FFFFFF',
    tintColor: '#6C6F89',
  },
};

const brand = {
  brand: {
    primary: '#8c7e7e',
    secondary: '#737589',
  },
};

const text = {
  textPrimary: '#333333',
  textLight: '#888',
  textSecondary: '#999999',
  textPrimaryLight: '#eeeeee',
  textSecondaryLight: '#aaaaaa',
  headingPrimary: '#333333',
  headingSecondary: '#999999',
};

const icons = {
  icons: {
    arrow: '#808080',
  },
};

const borders = {
  border: '#EBEBEB',
};

const tabbar = {
  tabbar: {
    background: '#FFFFFF',
    iconDefault: '#8D8D8D',
    iconSelected: brand.brand.primary,
  },
};

const colors = {
  colors: {
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    white: '#ffffff',
    divider: '#E8E7E8',
    orange: '#f08320',
    yellow: '#ffe900',
    red: '#fd4549',
    green: '#029861',
    blueGrey: '#6680b7',
    lightBlue: '#1eb0d8',
    skyblue: '#52acf7',
    blue: '#27a1d6',
    loginBg: '#2A1B2F'
  },
};

export default {
  ...app,
  ...navibar,
  ...brand,
  ...text,
  ...icons,
  ...borders,
  ...tabbar,
  ...colors,
};
