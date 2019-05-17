/**
 * Toolbar
 */
import React from 'react';
import { Header } from 'react-native-elements';
import { AppColors, AppStyles, AppFonts, AppSizes } from '@app/theme/';

/* Component ==================================================================== */
const Toolbar = ({ children, ...props }) => (
  <Header
    outerContainerStyles={{ height: AppSizes.toolbarHeight, paddingVertical: 4, paddingHorizontal: 10 }}
    innerContainerStyles={{ alignItems: 'center' }}
    backgroundColor='#F8F8F8'
    {...props}
  >
    {children}
  </Header>
);

Toolbar.propTypes = Header.propTypes;
Toolbar.componentName = 'Toolbar';

/* Export Component ==================================================================== */
export default Toolbar;
