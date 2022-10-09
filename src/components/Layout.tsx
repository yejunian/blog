import classNames from 'classnames'
import React from 'react'

import Footer from './Footer'
import Header from './Header'
import * as styles from './Layout.module.scss'

type LayoutProps = {
  children?: React.ReactNode
  mainClassName?: string
}

const Layout = ({ children, mainClassName }: LayoutProps) => (
  <div className={styles.root}>
    <Header />

    <main className={classNames(styles.main, mainClassName)}>
      {children}
    </main>

    <Footer />
  </div>
)

export default Layout
