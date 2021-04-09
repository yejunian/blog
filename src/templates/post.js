import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

import Layout from '../components/layout';
import PostInfoCard from '../components/post-info-card';
import SEO from '../components/seo';
import * as css from './post.module.css';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { license } = frontmatter;

  useEffect(() => {
    hljs.highlightAll();
  }, [html]);

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <article className={css.post}>
        <header className={css.postHeader}>
          <h1>{frontmatter.title}</h1>
          <ul>
            <li>
              최초 게시:{' '}
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
            </li>
            {frontmatter.revisions && (
              <li>
                최종 수정:{' '}
                <time dateTime={frontmatter.revisions}>
                  {frontmatter.revisions[frontmatter.revisions.length - 1]}
                </time>
              </li>
            )}
            <li>키워드: {frontmatter.keywords.join(', ')}</li>
          </ul>
        </header>

        {/* FIXME - Use hast instead of dangerouslySetInnerHTML */}
        <main
          className={css.postBody}
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
        revisions(formatString: "YYYY-MM-DD")
        title
        description
        license {
          post
          code
        }
        keywords
      }
    }
  }
`;
