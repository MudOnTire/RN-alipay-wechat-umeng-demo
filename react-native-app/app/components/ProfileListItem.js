import React from 'react';
import { TouchableHighlight } from "react-native";
import { ListItem } from 'react-native-elements';
import { AppColors, AppStyles } from '@app/theme/';

const ProfileListItem = ({ title, titleStyle, leftImage, imageStyle, rightTitleStyle, badge, containerStyle, height = 56, ...attributes }) => (
  <ListItem
    containerStyle={[AppStyles.listItemContainer, {
      backgroundColor: 'white',
      justifyContent: 'center',
      height,
      borderBottomColor: AppColors.colors.divider,
    }, containerStyle]}
    component={TouchableHighlight}
    underlayColor='#B8B8B8'
    wrapperStyle={{ alignItems: 'center' }}
    badge={badge}
    title={title}
    titleStyle={[AppStyles.baseText, { fontWeight: '400' }, titleStyle]}
    rightTitleStyle={[AppStyles.baseText, { color: '#999999' }, rightTitleStyle]}
    avatar={leftImage}
    avatarStyle={imageStyle}
    avatarContainerStyle={{ padding: 0 }}
    avatarOverlayContainerStyle={{ backgroundColor: 'transparent' }}
    hideChevron={false}
    chevronColor={AppColors.icons.arrow}
    activeOpacity={0.8}
    {...attributes}
  />
);

export default ProfileListItem;
