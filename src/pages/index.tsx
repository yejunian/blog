import { graphql, HeadFC, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import CategoryList from '../components/CategoryList'
import GeneralLayout from '../components/layout/GeneralLayout'
import Profile from '../components/Profile'
import PostList, { PostListItemArray } from '../components/PostList'
import Seo from '../components/head/Seo'
import getPostListItemArrayFromNode from '../utils/getPostListItemArrayFromNode'

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
    <GeneralLayout>
      <Profile />

      <hr />

      <CategoryList heading="어떤 분류로 끄적이고 있나" />

      <hr />

      <PostList isRecent={true} items={postItems} showMore={true} />
    </GeneralLayout>
  )
}

export const Head: HeadFC = () => <Seo />

export const query = graphql`
  query {
    allMdx(limit: 3, sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`

export default IndexPage
