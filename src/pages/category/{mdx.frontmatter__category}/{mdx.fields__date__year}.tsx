import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import categoryMetadata from '../../../blog-post/src/categoryMetadata'
import { PostListItemArray } from '../../../components/PostList'
import PostListLayout from '../../../components/PostListLayout'
import Seo from '../../../components/head/Seo'
import getPostListItemArrayFromNode from '../../../utils/getPostListItemArrayFromNode'
import { PostListPageDataType } from '../../post/index'

import * as styles from '../../GeneralPage.module.scss'

const AnnualPostListPage = ({
  data,
  params,
}: PageProps<PostListPageDataType>) => {
  const postItems: PostListItemArray = useMemo(
    () =>
      data.allMdx.edges.map(({ node }) => getPostListItemArrayFromNode(node)),
    [data.allMdx.edges]
  )

  const availableYears = useMemo(
    () => [...data.years.distinct].reverse(),
    [data.years.distinct]
  )

  return (
    <PostListLayout
      mainClassName={styles.root}
      showCategoryList={true}
      showPostList={true}
      categoryId={params.frontmatter__category}
      isYearFilterVisible={true}
      posts={postItems}
      availableYears={availableYears}
      selectedYear={params.fields__date__year}
      categoryListHeading="다른 분류"
    />
  )
}

export const Head: HeadFC<PostListPageDataType> = ({
  params,
  location,
}: HeadProps<PostListPageDataType>) => {
  const categoryLabel =
    categoryMetadata.get(params.frontmatter__category)?.label ??
    '알 수 없는 분류'

  return (
    <Seo
      canonicalPath={
        location.pathname.endsWith('/')
          ? location.pathname
          : `${location.pathname}/`
      }
      title={`글 목록 (${categoryLabel}, ${params.fields__date__year})`}
      noindex={true}
    />
  )
}

export const query = graphql`
  query ($fields__date__year: Date, $frontmatter__category: String) {
    years: allMdx(
      filter: { frontmatter: { category: { eq: $frontmatter__category } } }
    ) {
      distinct(field: fields___date___year)
    }

    allMdx(
      filter: {
        fields: { date: { year: { eq: $fields__date__year } } }
        frontmatter: { category: { eq: $frontmatter__category } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`

export default AnnualPostListPage
