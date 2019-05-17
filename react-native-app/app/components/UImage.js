import React, { Component } from 'react';
import {
  Image,
  Platform,
} from 'react-native';

const cachedImages = new Set();

export default class UImage extends Component {

  static propTypes = {
    ...Image.propTypes,
  };

  constructor(props) {
    super(props);
    const { defaultSource } = this.props;
    this.state = {
      source: defaultSource,
    };
  }

  renderImageIOS = () => {
    return <Image {...this.props} />;
  }

  renderImageAndroid = () => {
    const { source, defaultSource, ...restProps } = this.props;
    let targetSource = defaultSource;
    if (typeof source === 'object' && !cachedImages.has(source.uri)) {
      Image.prefetch(source.uri).then(() => {
        cachedImages.add(source.uri);
        this.setState({ source });
      }).catch(err => LogService.debug('图片加载失败：', source));
    } else {
      targetSource = source;
    }
    return (
      <Image
        source={targetSource}
        {...restProps}
      />
    );
  }

  render() {
    return Platform.OS === 'ios' ? this.renderImageIOS() : this.renderImageAndroid();
  }

}
