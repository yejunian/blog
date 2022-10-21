import { graphql, HeadFC, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import CategoryList from '../components/CategoryList'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import PostList, {
  PostListItemArray,
  PostListItemArrayEntry,
} from '../components/PostList'
import Seo from '../components/head/Seo'

import * as styles from './IndexPage.module.scss'

type IndexPageDataType = {
  allMdx: Queries.MdxConnection
}

// TODO - Extract when combining PostListItemArrayEntry with PostMetadataItem
const getPostListItemArrayFromNode = (
  node: Queries.Mdx
): PostListItemArrayEntry => {
  const datePath = node.fields?.date?.path ?? null
  const category = node.frontmatter?.category ?? null
  const formattedDate = node.frontmatter?.date ?? null
  const description = node.frontmatter?.description ?? null
  const mainKeywords: string[] = node.frontmatter?.keywords?.main
    ? (node.frontmatter.keywords.main.filter((value) =>
        value ? true : false
      ) as string[])
    : []
  const slug = node.frontmatter?.slug ?? null
  const subtitle = node.frontmatter?.subtitle ?? null
  const thumbnail =
    node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData ?? null
  const thumbnailAlt = node.frontmatter?.thumbnailAlt ?? null
  const title = node.frontmatter?.title ?? null
  const id = node.id

  return {
    id,
    subtitle,
    description,
    thumbnail,
    thumbnailAlt,
    path: `/${category}/${datePath}/${slug}`,
    date: formattedDate,
    title: title,
    keywords: mainKeywords,
  }
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

      <PostList categoryId="post" items={postItems} />
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo />

export const query = graphql`
  query {
    allMdx(
      filter: { frontmatter: { category: { eq: "post" } } }
      limit: 5
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            category
            date(formatString: "YYYY년 M월 D일")
            description
            keywords {
              main
            }
            slug
            subtitle
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
