import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import { PostListItemArray } from '../../components/PostList'
import PostListLayout from '../../components/PostListLayout'
import Seo from '../../components/head/Seo'
import getPostListItemArrayFromNode from '../../utils/getPostListItemArrayFromNode'
import { PostListPageDataType } from './index'

import * as styles from '../GeneralPage.module.scss'

const AnnualPostListPage = ({
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
      posts={postItems}
      year={params.fields__date__year}
      categoryListHeading="다른 분류"
    />
  )
}

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
)

export const query = graphql`
  query ($fields__date__year: Date) {
    allMdx(
      filter: { fields: { date: { year: { eq: $fields__date__year } } } }
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

export default AnnualPostListPage
