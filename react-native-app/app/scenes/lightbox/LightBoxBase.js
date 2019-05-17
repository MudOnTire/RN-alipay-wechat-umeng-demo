import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ColorPropType,
  ViewPropTypes,
} from 'react-native';
import Button from 'react-native-button';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { AppColors, AppStyles, AppFonts, AppSizes } from '@app/theme/';
import Toolbar from '@app/components/Toolbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class LightBoxBase extends Component {
  static propTypes = {
    showsToolbar: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    toolbarStyle: ViewPropTypes.style,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    contentBackground: ColorPropType,
    title: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    content: PropTypes.func,
    limitContentHeight: PropTypes.number,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onDismiss: PropTypes.func,
    position: PropTypes.oneOf(['bottom', 'center', 'top']),
    animationType: PropTypes.oneOf(['slideInUp', 'slideInDown', 'slideInRight', 'slideInLeft', 'zoomIn', 'fadeIn']),
    animationDuration: PropTypes.number,
  };

  static defaultProps = {
    showsToolbar: false,
    scrollEnabled: false,
    title: '',
    contentBackground: 'transparent',
    cancelText: '取消',
    confirmText: '确定',
    content: () => <View/>,
    limitContentHeight: 0,
    animationType: 'slideInUp',
    animationDuration: 300,
    onCancel: () => {
    },
    onConfirm: () => {
    },
    onDismiss: () => {
    },
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderContent(props) {
    return null;
  }

  dismiss = () => {
    const { onDismiss, animationType, animationDuration } = this.props;
    const contentAnimationMap = {
      slideInUp: 'slideOutDown',
      slideInDown: 'slideOutUp',
      slideInRight: 'slideOutRight',
      slideInLeft: 'slideOutLeft',
      zoomIn: 'zoomOut',
      fadeIn: 'fadeOut',
    };
    Promise.all([
      this.refs.cover.fadeOut(animationDuration),
      this.refs.content[contentAnimationMap[animationType]](animationDuration),
    ]).done(() => {
      Actions.pop();
      onDismiss && onDismiss();
    });
  };

  _onCancel = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
    this.dismiss();
  };

  _onConfirm = () => {
    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm();
    }
    this.dismiss();
  };

  render() {
    const {
      showsToolbar,
      scrollEnabled,
      toolbarStyle,
      cancelText,
      confirmText,
      title,
      contentBackground,
      limitContentHeight,
      containerStyle,
      animationType,
      animationDuration,
    } = this.props;
    const leftComponent = <Button onPress={this._onCancel}><Text
      style={[AppStyles.baseText, { color: AppColors.textPrimary }]}>{cancelText}</Text></Button>;
    const rightComponent = <Button onPress={this._onConfirm}><Text
      style={[AppStyles.baseText, { color: AppColors.textPrimary }]}>{confirmText}</Text></Button>;
    const centerComponent = <Text style={AppStyles.h5}>{title}</Text>;
    return (
      <Animatable.View
        ref='cover'
        style={[
          styles.container,
        ]}
        animation='fadeIn'
        duration={animationDuration}
      >
        <Animatable.View
          ref='content'
          animation={animationType}
          duration={animationDuration}
          style={[
            AppStyles.container,
            { backgroundColor: 'transparent' }
          ]}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={[
              AppStyles.container,
              { backgroundColor: 'transparent' },
              animationType === 'slideInRight' && { flexDirection: 'column', justifyContent: 'flex-end' },
              animationType === 'slideInLeft' && { flexDirection: 'column', justifyContent: 'flex-end' },
              animationType === 'slideInUp' && { flexDirection: 'column', justifyContent: 'flex-end' },
              animationType === 'slideInDown' && { flexDirection: 'column', justifyContent: 'flex-start' },
            ]}
            scrollEnabled={scrollEnabled}
          >
            <TouchableOpacity style={styles.cover} activeOpacity={1.0} onPress={this.dismiss}/>
            {
              showsToolbar && (
                <Toolbar
                  leftComponent={leftComponent}
                  centerComponent={centerComponent}
                  rightComponent={rightComponent}
                  style={[{}, !!toolbarStyle && toolbarStyle]}
                />
              )
            }
            <View
              style={[
                { flex: 1, backgroundColor: contentBackground, alignItems: 'stretch' },
                animationType === 'slideInRight' && { alignSelf: 'flex-end' },
                animationType === 'slideInLeft' && { alignSelf: 'flex-start' },
                animationType === 'slideInUp' && { alignSelf: 'flex-start', width: AppSizes.screen.width },
                animationType === 'slideInDown' && { alignSelf: 'flex-start', width: AppSizes.screen.width },
                limitContentHeight && { maxHeight: limitContentHeight },
                !!containerStyle && containerStyle,
              ]}
            >
              {this.renderContent(this.props)}
            </View>
          </KeyboardAwareScrollView>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
