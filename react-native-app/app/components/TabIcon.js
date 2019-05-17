import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  inActiveIcon: PropTypes.any,
  activeIcon: PropTypes.any.isRequired,
};

const defaultProps = {
  focused: false,
  title: '',
};

const TabIcon = ({ title, focused, inActiveIcon, activeIcon }) => {
  const color = focused ? AppColors.theme : AppColors.brand.primary;
  const icon = focused ? activeIcon : (inActiveIcon || activeIcon);
  const renderIcon = (icon) => {
    if (icon) {
      if (typeof icon === 'string') {
        return (<Icon name={icon} size={22} color={color} />);
      } else {
        return (<Image source={icon} style={{ width: 20, height: 20, resizeMode: 'stretch' }} resizeMode="stretch" />);
      }
    }
    return null;
  };
  return (
    <View style={[AppStyles.container, AppStyles.containerCentered, { backgroundColor: 'transparent' }]}>
      {renderIcon(icon)}
      <Text style={[AppStyles.h5, { color, fontWeight: '300', fontSize: 12 }]}>{title}</Text>
    </View>
  );
};

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
