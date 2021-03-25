import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <article>
        <h1>{frontmatter.title}</h1>
        <section>
          <div>{frontmatter.date}</div>
          <div>키워드: {frontmatter.keywords.join(', ')}</div>
        </section>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        slug
        keywords
      }
    }
  }
`;
