import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => (
    <Link key={node.id} to={node.frontmatter.slug}>
      <div>
        <h1>{node.frontmatter.title}</h1>
        <div>{node.frontmatter.date} | {node.frontmatter.keywords.join(', ')}</div>
        <div>{node.excerpt}</div>
      </div>
    </Link>
  ));

  return (
    <Layout>
      <SEO title="Home" />
      <div>전체 게시물 {data.allMarkdownRemark.totalCount}개</div>
      <div>{posts}</div>
    </Layout>
  )
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
