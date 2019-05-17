import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react/native';
import * as Animatable from 'react-native-animatable';
import { AppStyles} from '@app/theme/';
import LoadingService from '@app/services/LoadingService';
import { sleep } from '@app/utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

@observer
export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    LoadingService.registerLoading(this);
  }

  componentWillUnmount() {
    LoadingService.unregisterLoading(this);
  }

  show = async () => {
    await sleep(300);
  }

  hide = async () => {
    if (!this.refs.container) {
      await sleep(300);
    }
    if (!this.refs.container) {
      return;
    }
    await this.refs.container.fadeOut(300);
  }

  render() {
    const { show, title } = LoadingService;
    return show ? (
      <Animatable.View ref='container' animation='fadeIn' duration={300} style={styles.container}>
        <ActivityIndicator
          animating
          size='large'
          color='white'
        />
        <Text style={[AppStyles.h3, { color: 'white', marginTop: 5 }]}>{title}</Text>
      </Animatable.View>
    ) : null;
  }
}
