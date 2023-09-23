import { Link } from 'gatsby';
import React from 'react';

import logo from '../images/logo.svg';
import * as styles from './Header.module.scss';

const Header = () => (
  <header className={styles.root}>
    <nav className={styles.contents}>
      <div>
        <h2 className={styles.title}>
          <Link to="/">
            <img
              className={styles.logo}
              alt="yejunian / blog"
              src={logo}
              width={113}
              height={18}
            />
          </Link>
        </h2>
      </div>

      <div className={styles.navSub}>
        <Link to="/post">최근 글</Link>
      </div>
    </nav>
  </header>
);

export default Header;
