import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import LightBoxBase from './LightBoxBase';

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5'
  },
  top: {
    height: 40,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#fff',
    height: 44,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    paddingHorizontal: 8
  },
  confirmBtn: {
    backgroundColor: AppColors.brand.primary,
    color: '#fff',
    fontSize: 15,
    height: 44,
    lineHeight: 44,
    marginTop: 15
  }
});

export default class EditInput extends LightBoxBase {

  static propTypes = {
    ...LightBoxBase.propTypes,
    value: PropTypes.string,
  };

  state = {
    scrollEnabled: true,
    value: this.props.value,
  };

  constructor(props) {
    super(props);
  }

  renderContent = (props) => {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity onPress={this.dismiss}>
            <Text style={{ fontSize: 14, color: '#666' }}>取消</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={text => {
              this.setState({
                value: text
              });
            }} />
        </View>
        <Button
          style={styles.confirmBtn}
          onPress={() => {
            props.onConfirm(value, this.dismiss);
          }}
        >
          确 定
        </Button>
      </View>
    );
  }
}