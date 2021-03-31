import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import logo from '../images/logo.png';
import blogTitle from '../images/blog-title';
import Svg from './svg';

const Header = ({ siteTitle, menuOpened, onMenuClick }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" width={32} height={32} />
        <h1>
          <Svg { ...blogTitle } />
        </h1>
      </Link>
      <div>
        <button type="button" onClick={onMenuClick}>
          {menuOpened ? '^' : 'v'}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuOpened: PropTypes.bool,
  onMenuClick: PropTypes.func,
};

Header.defaultProps = {
  siteTitle: ``,
  menuOpened: false,
  onMenuClick: () => {},
};

export default Header;
