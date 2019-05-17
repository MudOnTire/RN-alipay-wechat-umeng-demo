import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  payway: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10
  }
});

export default class PayWayItem extends React.Component {

  onPress = () => {
    const { title, onPress } = this.props;
    onPress(title);
  }

  render() {
    const { logo, title, isSelected } = this.props;
    return (
      <TouchableOpacity style={styles.payway} onPress={this.onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={logo} style={styles.logo} resizeMode='contain'/>
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </View>
        {
          isSelected &&
          <Icon name='ios-checkmark' color={AppColors.colors.green} size={30}/>
        }
      </TouchableOpacity>
    )
  }
}

PayWayItem.propTypes = {
  logo: PropTypes.any,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func
}

PayWayItem.defaultProps = {
  logo: require('../assets/alipay/logo.png'),
  title: '支付宝支付',
  isSelected: true,
  onPress: () => { }
}