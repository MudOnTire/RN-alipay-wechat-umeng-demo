import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { Madoka } from 'react-native-textinput-effects';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'transparent'
  }
});

@observer
export default class FakeTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: props.value || '',
    };
  }

  static propTypes = {
    ...Madoka.propTypes,
    onPress: PropTypes.func,
    renderRightComponent: PropTypes.func,
    hideLabelWhenBlur: PropTypes.bool,
  };

  static defaultProps = {
    ...Madoka.defaultProps,
    hideLabelWhenBlur: true,
  };

  onFocus = (event) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
    this.setState({
      focused: true,
    });
  }

  onBlur = (event) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
    this.setState({
      focused: false,
    });
  }

  onChange = (event) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
    this.setState({
      value: event.nativeEvent.text,
    });
  }

  focus = () => {
    this.viewRef.inputRef().focus();
  }


  _onLayout = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  };

  _handleRef = (ref) => this.viewRef = ref;

  render() {
    const { onPress, height, renderRightComponent, label, hideLabelWhenBlur, ...props } = this.props;
    const { focused, value, width: containerWidth, height: containerHeight, } = this.state;
    return (
      <View onLayout={this._onLayout}>
        <Madoka {...props} ref={this._handleRef} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} height={height} label={(!onPress && !focused && hideLabelWhenBlur && !!value) ? '' : label} />
        {
          !!onPress && (<TouchableOpacity activeOpacity={1.0} onPress={onPress} style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0, width: containerWidth, height: containerHeight }} />)
        }
        {
          !!renderRightComponent && (
            <View style={[styles.rightContainer, { height }]}>
              {renderRightComponent(this.props)}
            </View>
          )
        }
      </View>
    );
  }

}
