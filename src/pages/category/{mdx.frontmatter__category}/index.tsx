import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import categoryMetadata from '../../../blog-post/src/categoryMetadata'
import { PostListItemArray } from '../../../components/PostList'
import PostListLayout from '../../../components/PostListLayout'
import Seo from '../../../components/head/Seo'
import getPostListItemArrayFromNode from '../../../utils/getPostListItemArrayFromNode'

import * as styles from '../../GeneralPage.module.scss'

export type PostListPageDataType = {
  allMdx: Queries.MdxConnection
}

const CategoryPostListPage = ({
  data,
  params,
}: PageProps<PostListPageDataType>) => {
  const postItems: PostListItemArray = useMemo(
    () =>
      data.allMdx.edges.map(({ node }) => getPostListItemArrayFromNode(node)),
    [data.allMdx.edges]
  )

  return (
    <PostListLayout
      mainClassName={styles.root}
      showCategoryList={true}
      showPostList={true}
      categoryId={params.frontmatter__category}
      isRecentPostList={true}
      posts={postItems}
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
      title={categoryLabel}
      noindex={true}
    />
  )
}

export const query = graphql`
  query ($frontmatter__category: String) {
    allMdx(
      filter: { frontmatter: { category: { eq: $frontmatter__category } } }
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            category
            date(formatString: "YYYY-MM-DD[T]HH:mm:ss[Z]")
            description
            keywords {
              main
            }
            slug
            thumbnail {
              childImageSharp {
                gatsbyImageData(breakpoints: [216, 432], layout: FULL_WIDTH)
              }
            }
            thumbnailAlt
            title
          }
          id
          fields {
            date {
              path
            }
          }
        }
      }
    }
  }
`

export default CategoryPostListPage
