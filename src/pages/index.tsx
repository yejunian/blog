import { graphql, HeadFC, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import CategoryList from '../components/CategoryList'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import PostList, { PostListItemArray } from '../components/PostList'
import Seo from '../components/head/Seo'
import getPostListItemArrayFromNode from '../utils/getPostListItemArrayFromNode'

import * as styles from './GeneralPage.module.scss'

type IndexPageDataType = {
  allMdx: Queries.MdxConnection
}

const IndexPage = ({ data }: PageProps<IndexPageDataType>) => {
  const postItems: PostListItemArray = useMemo(
    () =>
      data.allMdx.edges.map(({ node }) => getPostListItemArrayFromNode(node)),
    [data.allMdx.edges]
  )

  return (
    <Layout mainClassName={styles.root}>
      <Profile />

      <hr />

      <CategoryList heading="어떤 분류로 끄적이고 있나" />

      <hr />

      <PostList isRecent={true} items={postItems} showMore={true} />
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo />

export const query = graphql`
  query {
    allMdx(limit: 3, sort: { fields: frontmatter___date, order: DESC }) {
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

export default IndexPage
