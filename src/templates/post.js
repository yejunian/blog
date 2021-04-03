import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import PostInfoCard from '../components/post-info-card';
import SEO from '../components/seo';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { license } = frontmatter;

  return (
    <Layout>
      <SEO title={frontmatter.title} />

      <article>
        <header>
          <h1>{frontmatter.title}</h1>
          <ul>
            <li>{frontmatter.date}</li>
            <li>키워드: {frontmatter.keywords.join(', ')}</li>
          </ul>
        </header>
        {/* FIXME - Use hast instead of dangerouslySetInnerHTML */}
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <PostInfoCard {...license} />

      <div>{/* TODO */}다음 글, 이전 글 링크 영역</div>

      <div>{/* TODO */}댓글 영역</div>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        date(formatString: "YYYY-MM-DD")
        title
        license {
          post
          code
        }
        keywords
      }
    }
  }
`;
