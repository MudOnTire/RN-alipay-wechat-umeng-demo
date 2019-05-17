import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { Button as IconButton } from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '@app/theme/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: AppColors.background
  },
  logo: {
    width: 80,
    height: 80
  }
});

const LoginPageLayout = ({ title, onClose, children, hideClose }) => (
  <View style={styles.container}>
    <View style={{ height: 50 }}>
      {
        !hideClose && (
          <IconButton
            name='ios-close'
            color='black'
            size={30}
            underlayColor='transparent'
            backgroundColor='transparent'
            activeOpacity={0.5}
            onPress={() => onClose && onClose()}
            visible={!hideClose}
          />
        )
      }
    </View>
    <Text style={[AppStyles.h3, { fontSize: 18, marginBottom: 40 }]}>{title}</Text>
    {children}
  </View>
);

export default LoginPageLayout;

