import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Not found" />
    <h1>404 Not Found</h1>
    <p>존재하지 않는 페이지입니다.</p>
  </Layout>
);

export default NotFoundPage;
