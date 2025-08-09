import { Link, HeadFC } from 'gatsby';
import React from 'react';

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Go home</Link>
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found - yejunian/blog</title>;
