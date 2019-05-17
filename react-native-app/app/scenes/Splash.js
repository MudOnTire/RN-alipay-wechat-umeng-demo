import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import {
  ImageBackground
} from 'react-native';
import { AppStyles } from '@app/theme/';
import UserService from '@app/services/UserService';

@observer
export default class extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // const login = await UserService.checkLogin();
    // this._jump(login);
    setTimeout(() => {
      Actions.replace('tabs');
    }, 600);
  }

  _jump = (login) => {
    setTimeout(() => {
      if (login) {
        Actions.replace('tabs');
      } else {
        Actions.replace('login');
      }
    }, 600);
  };

  render() {
    return (
      <ImageBackground
        style={[AppStyles.container, AppStyles.containerCentered, { backgroundColor: '#fff' }]}
        source={require('@app/assets/splash.png')}
        resizeMode='contain'
      >
      </ImageBackground>
    );
  }
}
