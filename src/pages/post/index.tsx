import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import { PostListItemArray } from '../../components/PostList'
import PostListLayout from '../../components/PostListLayout'
import Seo from '../../components/head/Seo'
import getPostListItemArrayFromNode from '../../utils/getPostListItemArrayFromNode'

import * as styles from '../GeneralPage.module.scss'

export type PostListPageDataType = {
  allMdx: Queries.MdxConnection
}

const RecentPostListPage = ({ data }: PageProps<PostListPageDataType>) => {
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
      isRecentPostList={true}
      posts={postItems}
    />
  )
}

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
)

export const query = graphql`
  query {
    allMdx(limit: 10, sort: { fields: frontmatter___date, order: DESC }) {
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

export default RecentPostListPage
