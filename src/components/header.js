import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import logo from '../images/logo.png';
import blogTitle from '../images/blog-title';
import Svg from './svg';
import './header.css';

const Header = ({ siteTitle, menuOpened, onMenuClick }) => {
  return (
    <div className="site-header-wrapper">
      <header className="site-header">
        <div className="logo-wrapper">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" width={32} height={32} />
          </Link>
        </div>
        <h1 className="title">
          <Link to="/">
            <Svg {...blogTitle} />
          </Link>
        </h1>
        <div className="menu">
          <button type="button" onClick={onMenuClick}>
            {menuOpened ? '^' : 'v'}
          </button>
        </div>
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
