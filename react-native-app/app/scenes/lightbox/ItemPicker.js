import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PickerIOS,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Picker from 'react-native-wheel-picker';
import { SafeAreaView } from 'react-navigation';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { AppColors, AppStyles, AppFonts, AppSizes } from '@app/theme/';
import LightBoxBase from './LightBoxBase';

const styles = StyleSheet.create({});

@observer
export default class ItemPicker extends LightBoxBase {

  static propTypes = {
    ...LightBoxBase.propTypes,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any, // 数字或字符串
    })),
    selectedIndex: PropTypes.number,
    onValueChange: PropTypes.func,
    enableEmptyItem: PropTypes.bool,
    emptyItem: PropTypes.object,
  };

  static defaultProps = {
    ...LightBoxBase.defaultProps,
    items: [],
    selectedIndex: 0,
    onValueChange: () => {
    },
    enableEmptyItem: false,
    emptyItem: { label: '无', value: -1 },
  };

  @observable items = [];
  @observable selectedIndex = 0;

  constructor(props) {
    super(props);
    const { items, selectedIndex, enableEmptyItem, emptyItem } = props;
    this.items.push(...items);
    if (enableEmptyItem) {
      this.items.push({ label: emptyItem.label, value: emptyItem.value });
    }
    this.selectedIndex = selectedIndex;
    this._onValueChange(this.items[this.selectedIndex], this.selectedIndex);
  }

  _onValueChange = (itemValue, itemIndex) => {
    this.selectedIndex = itemIndex;
    const selectedItem = this.items[itemIndex];
    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange(selectedItem, itemIndex);
    }
  };

  renderContent = (props) => {
    const selectedItem = this.items[this.selectedIndex];

    const extraProps = {
      curve: true,
      indicator: true,
      indicatorSize: 1,
      indicatorColor: AppColors.textSecondary,
      selectedTextColor: AppColors.textPrimary,
    };
    return (
      <SafeAreaView forceInset={{ top: 'never', bottom: 'always' }}
        style={{ flex: 1, backgroundColor: 'transparent' }}>
        {
          Platform.OS === 'ios' && (
            <PickerIOS
              style={AppStyles.container}
              selectedValue={selectedItem.value}
              onValueChange={this._onValueChange}
            >
              {
                this.items.map(({ label, value }, index) => (
                  <PickerIOS.Item key={`key-${index}`} label={label} value={value} />))
              }
            </PickerIOS>
          )
        }

        {
          Platform.OS === 'android' && (
            <Picker
              style={AppStyles.container}
              itemStyle={{ color: AppColors.textSecondary }}
              selectedValue={selectedItem.value}
              onValueChange={this._onValueChange}
              {...extraProps}
            >
              {
                this.items.map(({ label, value }, index) => (
                  <Picker.Item key={`key-${index}`} label={label} value={value} />
                ))
              }
            </Picker>
          )
        }
      </SafeAreaView>
    );
  }

}
