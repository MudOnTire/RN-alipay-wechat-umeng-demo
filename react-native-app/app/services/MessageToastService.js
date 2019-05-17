import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MessageBarManager } from 'react-native-message-bar';
import { AppStyles, AppSizes } from '@app/theme';

class MessageToastService {

  /**
   *
   * @param alert
   */
  showAlert(alert = {}) {
    const alertInfo = Object.assign({
      alertType: 'default',
      title: '',
      message: '',
      position: 'top',
      animationType: 'SlideFromTop',
      viewTopInset: AppSizes.statusBarHeight,
    }, alert);
    MessageBarManager.showAlert(alertInfo);
  }

  /**
   *
   */
  hideAlert() {
    MessageBarManager.hideAlert();
  }

  /**
   *
   * @param title
   * @param message
   */
  showSuccess(title, message) {
    this.showAlert({
      alertType: 'success',
      avatar: (
        <View style={[AppStyles.containerCentered, { width: 40, height: 40 }]}>
          <Icon name='ios-checkmark' size={36} color='white'/>
        </View>
      ),
      title,
      message,
      stylesheetSuccess: {
        backgroundColor: '#20c997',
        strokeColor: 'transparent',
        titleColor: '#fff',
        messageColor: '#fff'
      },
    });
  }

  /**
   *
   * @param title
   * @param message
   */
  showInfo(title, message) {
    this.showAlert({
      alertType: 'info',
      avatar: (
        <View style={[AppStyles.containerCentered, { width: 40, height: 40 }]}>
          <Icon name='ios-information' size={36} color='white'/>
        </View>
      ),
      title,
      message,
      stylesheetInfo: {
        backgroundColor: '#007bff',
        strokeColor: 'transparent',
        titleColor: '#fff',
        messageColor: '#fff'
      },
    });
  }

  /**
   *
   * @param title
   * @param message
   */
  showWarn(title, message) {
    this.showAlert({
      alertType: 'warning',
      avatar: (
        <View style={[AppStyles.containerCentered, { width: 40, height: 40 }]}>
          <Icon name='ios-warning' size={36} color='white'/>
        </View>
      ),
      title,
      message,
      stylesheetWarning: {
        backgroundColor: '#fd7e14',
        strokeColor: 'transparent',
        titleColor: '#fff',
        messageColor: '#fff'
      },
    });
  }

  /**
   *
   * @param title
   * @param message
   */
  showError(title, message) {
    this.showAlert({
      alertType: 'error',
      avatar: (
        <View style={[AppStyles.containerCentered, { width: 40, height: 40 }]}>
          <Icon name='ios-close' size={36} color='white'/>
        </View>
      ),
      title,
      message,
      stylesheetError: {
        backgroundColor: '#dc3545',
        strokeColor: 'transparent',
        titleColor: '#fff',
        messageColor: '#fff'
      },
    });
  }

  showNoti(title, message, onTap) {
    this.showAlert({
      alertType: 'info',
      avatar: (
        <View style={[AppStyles.containerCentered, { width: 34, height: 34 }]}>
          <Icon name='ios-chatboxes' size={24} color='#fff'/>
        </View>
      ),
      title,
      message,
      stylesheetInfo: {
        backgroundColor: '#20c997',
        strokeColor: 'transparent',
        titleColor: '#fff',
        messageColor: '#fff'
      },
      onTapped: onTap
    });
  }

}

export default new MessageToastService();
