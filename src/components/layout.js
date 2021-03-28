import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Header from './header';
import './layout.css';

const getYears = () => {
  const year = new Date().getFullYear();
  return `${year > 2021 ? '2021-' : ''}${year}`;
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [menuOpened, setMenuOpened] = useState(false);
  const onMenuClick = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        menuOpened={menuOpened}
        onMenuClick={onMenuClick}
      />
      <main>{children}</main>
      <aside>sidebar area</aside>
      <footer>
        <ul>
          <li>
            <a href="https://leeye51456.github.io/">Home</a>
          </li>
          <li>
            <Link to="/">Blog</Link> (
            <a href="https://github.com/leeye51456/blog">Repository</a>)
          </li>
          <li>
            <a href="https://leeye51456.github.io/portfolio/">Portfolio</a>
          </li>
        </ul>
        <p>
          © {getYears()} leeye51456, Built with
          {` `}
          <a href="https://www.gatsbyjs.com/">Gatsby</a>
        </p>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
