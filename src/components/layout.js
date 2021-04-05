import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import * as css from './layout.module.css';

const Layout = ({ children, sidebar }) => {
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
    <div className={css.root}>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        menuOpened={menuOpened}
        onMenuClick={onMenuClick}
      />

      <main>{children}</main>

      {sidebar && <aside>sidebar area</aside>}

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
