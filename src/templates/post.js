import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import PostInfoCard from '../components/post-info-card';
import SEO from '../components/seo';
import './post.css';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { license } = frontmatter;
  const date = {
    publish: frontmatter.date[0],
    modify:
      frontmatter.date.length > 1
        ? frontmatter.date[frontmatter.date.length - 1]
        : null,
  };

  return (
    <Layout>
      <SEO title={frontmatter.title} />

      <article className="post">
        <header className="post-header">
          <h1>{frontmatter.title}</h1>
          <ul>
            <li>
              최초 게시: <time dateTime={date.publish}>{date.publish}</time>
            </li>
            {date.modify && (
              <li>
                최종 수정: <time dateTime={date.modify}>{date.modify}</time>
              </li>
            )}
            <li>키워드: {frontmatter.keywords.join(', ')}</li>
          </ul>
        </header>

        {/* FIXME - Use hast instead of dangerouslySetInnerHTML */}
        <main
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <PostInfoCard {...license} />
      </article>

      <section>{/* TODO */}다음 글, 이전 글 링크 영역</section>

      <section>{/* TODO */}댓글 영역</section>
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
