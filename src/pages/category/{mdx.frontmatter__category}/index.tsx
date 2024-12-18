import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import React, { useMemo } from 'react';

import categoryMetadata from '../../../blog-post/metadata/category';
import { PostListItemArray } from '../../../components/PostList';
import Seo from '../../../components/head/Seo';
import PostListLayout from '../../../components/layout/PostListLayout';
import getPostListItemArrayFromNode from '../../../utils/getPostListItemArrayFromNode';
import { PostListPageDataType } from '../../post/index';

const CategoryPostListPage = ({
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
      categoryId={params.frontmatter__category}
      isRecentPostList={true}
      isYearFilterVisible={true}
      posts={postItems}
      availableYears={availableYears}
      selectedYear={params.fields__date__year}
      categoryListHeading="다른 분류"
    />
  );
};

export const Head: HeadFC<PostListPageDataType> = ({
  params,
  location,
}: HeadProps<PostListPageDataType>) => {
  const categoryLabel =
    categoryMetadata.get(params.frontmatter__category)?.label ??
    '알 수 없는 분류';

  return (
    <Seo
      canonicalPath={
        location.pathname.endsWith('/')
          ? location.pathname
          : `${location.pathname}/`
      }
      title={categoryLabel}
      noindex={true}
    />
  );
};

export const query = graphql`
  query ($frontmatter__category: String) {
    years: allMdx(
      filter: { frontmatter: { category: { eq: $frontmatter__category } } }
    ) {
      distinct(field: { fields: { date: { year: SELECT } } })
    }

    allMdx(
      filter: { frontmatter: { category: { eq: $frontmatter__category } } }
      limit: 10
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

export default CategoryPostListPage;
