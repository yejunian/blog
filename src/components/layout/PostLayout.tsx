import classNames from 'classnames'
import React from 'react'

import BaseLayout, { BaseLayoutProps } from './BaseLayout'
import * as styles from './PostLayout.module.scss'

const PostLayout = ({ children, mainClassName }: BaseLayoutProps) => (
  <BaseLayout mainClassName={classNames(styles.main, mainClassName)}>
    {children}
  </BaseLayout>
)

export default PostLayout
