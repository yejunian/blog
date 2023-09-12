import classNames from 'classnames';
import React from 'react';

import BaseLayout, { BaseLayoutProps } from './BaseLayout';
import * as styles from './GeneralLayout.module.scss';

const GeneralLayout = ({ children, mainClassName }: BaseLayoutProps) => (
  <BaseLayout mainClassName={classNames(styles.main, mainClassName)}>
    {children}
  </BaseLayout>
);

export default GeneralLayout;
