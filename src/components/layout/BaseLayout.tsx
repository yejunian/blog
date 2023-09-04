import classNames from 'classnames'
import React from 'react'

import Footer from '../Footer'
import Header from '../Header'
import * as styles from './BaseLayout.module.scss'

export type BaseLayoutProps = {
  children?: React.ReactNode
  mainClassName?: string
}

const BaseLayout = ({ children, mainClassName }: BaseLayoutProps) => (
  <div className={styles.root}>
    <Header />

    <main className={classNames(styles.main, mainClassName)}>{children}</main>

    <Footer />
  </div>
)

export default BaseLayout
