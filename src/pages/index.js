import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import * as css from './index.module.css';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .filter(({ node }) => node.frontmatter.published)
    .map(({ node }) => (
      <div className={css.item}>
        <Link className={css.link} key={node.id} to={node.frontmatter.slug}>
          <h1>{node.frontmatter.title}</h1>
        </Link>
        <div className={css.frontmatter}>
          {node.frontmatter.date} | {node.frontmatter.keywords.join(', ')}
        </div>
        <div className={css.description}>{node.excerpt}</div>
      </div>
    ));

  return (
    <Layout>
      <SEO title="Blog" />
      <div>전체 게시물 {posts.length}개</div>
      <div className={css.postList}>{posts}</div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            published
            title
            date(formatString: "YYYY-MM-DD")
            slug
            keywords
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`;
