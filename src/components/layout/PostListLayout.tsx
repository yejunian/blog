import React from 'react'

import PostList, { PostListItemArray } from '../PostList'
import CategoryList from '../CategoryList'
import GeneralLayout from './GeneralLayout'

type PostListLayoutProps = {
  mainClassName?: string
  showPostList: boolean
  showCategoryList: boolean

  categoryId?: string

  isRecentPostList?: boolean
  posts?: PostListItemArray
  isMorePostsVisible?: boolean
  isYearFilterVisible?: boolean
  availableYears?: (number | string)[]
  selectedYear?: number | string

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
  isYearFilterVisible,
  availableYears,
  selectedYear,
  categoryListHeading,
}: PostListLayoutProps) => (
  <GeneralLayout mainClassName={mainClassName}>
    {showPostList && posts ? (
      <PostList
        availableYears={availableYears}
        categoryId={categoryId}
        isRecent={isRecentPostList}
        items={posts}
        selectedYear={selectedYear}
        showMore={isMorePostsVisible}
        showYearFilter={isYearFilterVisible}
      />
    ) : null}

    {showPostList && posts && showCategoryList ? <hr /> : null}

    {showCategoryList ? (
      <CategoryList
        heading={categoryListHeading ?? '어떤 분류로 끄적이고 있나'}
        categoryId={categoryId}
      />
    ) : null}
  </GeneralLayout>
)

export default PostListLayout
