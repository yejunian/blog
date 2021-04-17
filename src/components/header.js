import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import logo from '../images/logo-3x.png';
import blogTitle from '../images/blog-title';
import Svg from './svg';
import * as css from './header.module.css';

const Header = ({ siteTitle, menuOpened, onMenuClick }) => {
  return (
    <div className={css.siteHeaderWrapper}>
      <header className={css.siteHeader}>
        <div className={css.logoWrapper}>
          <Link to="/">
            <img className={css.logo} src={logo} alt="logo" width={32} height={32} />
          </Link>
        </div>
        <h1 className={css.title}>
          <Link to="/">
            <Svg {...blogTitle} />
          </Link>
        </h1>
        {/* <div className={css.menu}>
          <button type="button" onClick={onMenuClick}>
            {menuOpened ? '^' : 'v'}
          </button>
        </div> */}
      </header>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuOpened: PropTypes.bool,
  onMenuClick: PropTypes.func,
};

Header.defaultProps = {
  siteTitle: '',
  menuOpened: false,
  onMenuClick: () => {},
};

export default Header;
