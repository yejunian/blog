import React from 'react';
import { Link } from 'gatsby';

const years = (() => {
  const year = new Date().getFullYear();
  return `${year > 2021 ? '2021-' : ''}${year}`;
})();

const Footer = () => (
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
      © {years} leeye51456, Built with{' '}
      <a href="https://www.gatsbyjs.com/">Gatsby</a>
    </p>
  </footer>
);

export default Footer;
