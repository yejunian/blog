import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React, { useMemo } from 'react';

import { PostListItemArray } from '../../components/PostList';
import Seo from '../../components/head/Seo';
import PostListLayout from '../../components/layout/PostListLayout';
import getPostListItemArrayFromNode from '../../utils/getPostListItemArrayFromNode';

export type PostListPageDataType = {
  allMdx: Queries.MdxConnection;
  years: Queries.MdxConnection;
};

const RecentPostListPage = ({ data }: PageProps<PostListPageDataType>) => {
  const postItems: PostListItemArray = useMemo(
    () =>
      data.allMdx.edges.map(({ node }) => getPostListItemArrayFromNode(node)),
    [data.allMdx.edges],
  );

  const availableYears = useMemo(
    () => [...data.years.distinct].reverse(),
    [data.years.distinct],
  );

  return (
    <PostListLayout
      showCategoryList={true}
      showPostList={true}
      isRecentPostList={true}
      posts={postItems}
      isYearFilterVisible={true}
      availableYears={availableYears}
    />
  );
};

export const Head: HeadFC<PostListPageDataType> = ({
  location,
}: HeadProps<PostListPageDataType>) => (
  <Seo
    canonicalPath={
      location.pathname.endsWith('/')
        ? location.pathname
        : `${location.pathname}/`
    }
    title="글 목록"
    noindex={true}
  />
);

export const query = graphql`
  query {
    years: allMdx {
      distinct(field: { fields: { date: { year: SELECT } } })
    }

    allMdx(limit: 10, sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`;

export default RecentPostListPage;
