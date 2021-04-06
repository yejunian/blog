import React from 'react';
import { Link } from 'gatsby';

import * as css from './footer.module.css';

const years = (() => {
  const year = new Date().getFullYear();
  return `${year > 2021 ? '2021-' : ''}${year}`;
})();

const Footer = () => (
  <div className={css.siteFooterWrapper}>
    <footer className={css.siteFooter}>
      <ul>
        <li>
          <a href="https://leeye51456.github.io/">Home</a>
        </li>
        <li>
          <Link to="/">Blog</Link>{' '}
          <small>
            (<a href="https://github.com/leeye51456/blog">Repository</a>)
          </small>
        </li>
        <li>
          <a href="https://leeye51456.github.io/portfolio/">Portfolio</a>
        </li>
        <li>
          <a href="https://github.com/leeye51456">GitHub Profile</a>
        </li>
      </ul>
      <p>
        © {years} leeye51456, Built with{' '}
        <a href="https://www.gatsbyjs.com/">Gatsby</a>
      </p>
    </footer>
  </div>
);

export default Footer;
