import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import PostList from '../components/post-list';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <p>{data.site.siteMetadata.description}</p>
      <PostList edges={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            published
            title
            description
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
