import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

/* Component ==================================================================== */
const Spacer = ({ size, backgroundColor, left, right, height}) => (
  <View
    style={{
      left,
      right,
      height: height ? height : StyleSheet.hairlineWidth,
      marginTop: size - 1,
      backgroundColor,
    }}
  />
);

Spacer.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  left: PropTypes.number,
  right: PropTypes.number,
  height: PropTypes.number,
};
Spacer.defaultProps = { size: 10, backgroundColor: 'rgba(0, 0, 0, 0)', left: 0, right: 0 };
Spacer.componentName = 'Spacer';

/* Export Component ==================================================================== */
export default Spacer;
