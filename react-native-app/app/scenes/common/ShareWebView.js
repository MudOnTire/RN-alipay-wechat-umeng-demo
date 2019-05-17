import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView, HeaderBackButton } from 'react-navigation';
import ToastService from '@app/services/MessageToastService';
import UMShare from '@app/utils/umshare';

const contentTypes = ['news', 'post'];
const source = { uri: 'http://www.bing.com' };

@observer
export default class ShareWebView extends Component {


  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string,
      method: PropTypes.string,
      headers: PropTypes.object,
      body: PropTypes.string,
    }).isRequired,
    contentType: PropTypes.oneOf(contentTypes),
    itemId: PropTypes.string
  };

  static defautProps = {
    contentType: 'news'
  };

  static onEnter = (props) => {
    let { shareTitle, shareDesc } = props;

    const onRight = () => {
      if (!shareTitle) shareTitle = '示例网站';
      if (!shareDesc) shareDesc = '';
      UMShare.showShareMenus((val) => {
        console.log(val);
        const logoUrl = 'http://lc-PcY7Ipkt.cn-n1.lcfile.com/b5b5e453f17ca43a4d36/avatar.jpeg';
        UMShare.share(shareTitle, shareDesc, source.uri, logoUrl, val, (message) => {
          if (message.indexOf('成功') >= 0) {
            // ToastService.showSuccess(message);
          } else if (message.indexOf('失败') >= 0) {
            ToastService.showError(message);
          } else if (message.indexOf('取消') >= 0) {
            ToastService.showWarn(message);
          }
        });
      });
    };

    Actions.refresh({
      rightButtonImage: require('@app/assets/share_icon.png'),
      onRight,
    });
  };

  state = {
    progress: .0,
    canGoBack: false,
  };

  @observable comment = null;
  @observable isLogin = false;
  isFavorite;

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      left: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HeaderBackButton tintColor='#666' onPress={() => {
            if (this.state.canGoBack) {
              this.refs.webview.goBack();
            } else {
              Actions.pop();
            }
          }} />
          <TouchableOpacity activeOpacity={0.6} onPress={() => Actions.pop()}>
            <Ionicons name='ios-close' size={36} color='#666' />
          </TouchableOpacity>
        </View>
      )
    });
  }

  onBackPress = () => {
    console.log('can goback:', this.state.canGoBack);
    if (this.state.canGoBack) {
      this.refs.webview.goBack();
    } else {
      Actions.pop();
    }
    return true;
  };

  // 获取 webview 事件返回的 canGoBack 属性 ， 判断网页是否可以回退
  _onNavigationStateChange = (navState) => {
    console.log('nav state change: ', navState);
    this.setState({ canGoBack: navState.canGoBack });
  };

  _renderProgressView = () => {
    const { progress } = this.state;
    if (Platform.OS === 'ios') {
      return (<ProgressViewIOS progressViewStyle='bar' progress={progress} progressTintColor={AppColors.brand.primary}
        trackTintColor={'white'} />);
    }
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid styleAttr='Horizontal' color={AppColors.brand.primary} indeterminate progress={progress} />);
    }
    return null;
  };

  _onLoadProgress = (e) => {
    const progress = e.nativeEvent.progress;
    this.setState({
      progress,
    }, () => {
      if (progress === .0) {
        this.refs.progressView.transitionTo({
          opacity: 1.0,
        });
      }
      if (progress === 1.0) {
        this.refs.progressView.transitionTo({
          opacity: .0,
        });
      }
    });
  };

  render() {
    return (
      <SafeAreaView forceInset={{ always: 'always' }} style={AppStyles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
          <WebView
            ref='webview'
            style={{ flex: 1 }}
            domStorageEnabled
            javaScriptEnabled
            source={source}
            onLoadProgress={this._onLoadProgress}
            onNavigationStateChange={this._onNavigationStateChange}
          />
          <Animatable.View ref='progressView' style={[styles.progressWrapper, { marginTop: AppSizes.navbarHeight }]}>
            {this._renderProgressView()}
          </Animatable.View>
        </KeyboardAwareScrollView>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  progressWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    paddingTop: AppSizes.navbarHeight,
  },
  bottomCommentBox: {
    borderTopWidth: 1, borderTopColor: AppColors.border
  },
});
