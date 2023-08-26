import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import CategoryList from '../components/CategoryList'
import Layout from '../components/Layout'
import PostList, { PostListItemArray } from '../components/PostList'
import Seo from '../components/head/Seo'
import getPostListItemArrayFromNode from '../utils/getPostListItemArrayFromNode'

import * as styles from './GeneralPage.module.scss'
import categoryMetadata from '../blog-post/src/categoryMetadata'

type CategoryPageDataType = {
  allMdx: Queries.MdxConnection
}

export const CategoryPageWith =
  (all?: boolean) =>
  ({ data, params }: PageProps<CategoryPageDataType>) => {
    const postItems: PostListItemArray = useMemo(
      () =>
        data.allMdx.edges.map(({ node }) => getPostListItemArrayFromNode(node)),
      [data.allMdx.edges]
    )

    return (
      <Layout mainClassName={styles.root}>
        <PostList
          categoryId={all ? 'all' : params.frontmatter__category}
          items={postItems}
        />

        <hr />

        <CategoryList heading="다른 분류" />
      </Layout>
    )
  }

export const CategoryPageHeadWith =
  (all?: boolean): HeadFC<CategoryPageDataType> =>
  ({ params, location }: HeadProps<CategoryPageDataType>) => {
    const categoryId = params.frontmatter__category
    const categoryLabel = categoryMetadata.get(categoryId ?? '')?.label

    return (
      <Seo
        canonicalPath={
          location.pathname.endsWith('/')
            ? location.pathname
            : `${location.pathname}/`
        }
        title={all ? '전체 글' : categoryLabel}
        noindex={true}
      />
    )
  }

const AllCategoryPage = CategoryPageWith(true)
export const Head = CategoryPageHeadWith(true)

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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

export default AllCategoryPage
