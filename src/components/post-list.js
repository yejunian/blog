import React from 'react';
import { Link } from 'gatsby';

import * as css from './post-list.module.css';

const getPostList = (edges) =>
  edges
    .filter(({ node }) => node.frontmatter.published)
    .map(({ node }) => (
      <div className={css.item} key={node.id}>
        <div className={css.frontmatter}>
          {node.frontmatter.date}
          {' | '}
          {node.frontmatter.keywords.length > 0 ? node.frontmatter.keywords.join(', ') : '키워드 없음'}
        </div>
        <Link className={css.link} to={node.frontmatter.slug}>
          <h1>{node.frontmatter.title}</h1>
          <div className={css.description}>{node.frontmatter.description || node.excerpt}</div>
        </Link>
      </div>
    ));

const PostList = ({ edges }) => {
  const posts = getPostList(edges);

  return (
    <>
      <div className={css.postCount}>전체 게시물 {posts.length}개</div>
      <div className={css.postList}>{posts}</div>
    </>
  );
};

export default PostList;
