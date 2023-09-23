import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React, { useMemo } from 'react';

import { PostListItemArray } from '../../components/PostList';
import Seo from '../../components/head/Seo';
import PostListLayout from '../../components/layout/PostListLayout';
import getPostListItemArrayFromNode from '../../utils/getPostListItemArrayFromNode';
import { PostListPageDataType } from './index';

const AnnualPostListPage = ({
  data,
  params,
}: PageProps<PostListPageDataType>) => {
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
      posts={postItems}
      isYearFilterVisible={true}
      availableYears={availableYears}
      selectedYear={params.fields__date__year}
      categoryListHeading="다른 분류"
    />
  );
};

export const Head: HeadFC<PostListPageDataType> = ({
  params,
  location,
}: HeadProps<PostListPageDataType>) => (
  <Seo
    canonicalPath={
      location.pathname.endsWith('/')
        ? location.pathname
        : `${location.pathname}/`
    }
    title={`글 목록 (${params.fields__date__year})`}
    noindex={true}
  />
);

export const query = graphql`
  query ($fields__date__year: Date) {
    years: allMdx {
      distinct(field: { fields: { date: { year: SELECT } } })
    }

    allMdx(
      filter: { fields: { date: { year: { eq: $fields__date__year } } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`;

export default AnnualPostListPage;
