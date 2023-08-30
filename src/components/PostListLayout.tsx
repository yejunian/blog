import React from 'react'

import Layout from './Layout'
import PostList, { PostListItemArray } from './PostList'
import CategoryList from './CategoryList'

type PostListLayoutProps = {
  mainClassName?: string
  showPostList: boolean
  showCategoryList: boolean

  categoryId?: string

  isRecentPostList?: boolean
  posts?: PostListItemArray
  isMorePostsVisible?: boolean
  year?: number | string

  categoryListHeading?: string
}

const PostListLayout = ({
  mainClassName,
  showPostList,
  showCategoryList,
  categoryId,
  isRecentPostList,
  posts,
  isMorePostsVisible,
  year,
  categoryListHeading,
}: PostListLayoutProps) => (
  <Layout mainClassName={mainClassName}>
    {showPostList && posts ? (
      <PostList
        categoryId={categoryId}
        isRecent={isRecentPostList}
        items={posts}
        showMore={isMorePostsVisible}
        year={year}
      />
    ) : null}

    {showPostList && posts && showCategoryList ? <hr /> : null}

    {showCategoryList ? (
      <CategoryList
        heading={categoryListHeading ?? '어떤 분류로 끄적이고 있나'}
      />
    ) : null}
  </Layout>
)

export default PostListLayout
