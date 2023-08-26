import { Link } from 'gatsby'
import React, { useMemo } from 'react'

import categoryMetadata from '../../blog-post/src/categoryMetadata'
import PostListItem, { PostListItemProps } from './PostListItem'

import * as styles from './PostList.module.scss'

type PostListProps = {
  categoryId?: string
  items: PostListItemArray
  showMore?: boolean
}

export type PostListItemArray = PostListItemArrayEntry[]
export type PostListItemArrayEntry = PostListItemProps & { id: string }

const PostList = ({ categoryId, items, showMore }: PostListProps) => {
  const categoryLabel = categoryMetadata.get(categoryId ?? '')?.label
  const fallbackHeadingPrefixNode = categoryLabel ? (
    <>
      <Link to={`/${categoryId}/`}>‘{categoryLabel}’</Link>에는{' '}
    </>
  ) : null
  const headingLabelNode =
    categoryId === 'all' ? (
      <Link to="/all/">무엇을 끄적였나</Link>
    ) : (
      <>{fallbackHeadingPrefixNode}무엇을 끄적였나</>
    )

  const postListItems = useMemo(
    () =>
      items.map((item) => (
        <PostListItem
          key={item.id}
          path={item.path}
          date={item.date}
          title={item.title}
          description={item.description}
          keywords={item.keywords}
          thumbnail={item.thumbnail}
          thumbnailAlt={item.thumbnailAlt}
        />
      )),
    [items]
  )

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{headingLabelNode}</h2>

      <div className={styles.list}>
        {postListItems.length > 0 ? (
          postListItems
        ) : (
          <div className={styles.empty}>// 앗, 여기에는 글이 없어요!</div>
        )}
      </div>

      {showMore && categoryId ? (
        <div className={styles.more}>
          <Link to={`/${categoryId ?? 'all'}/`}>
            {categoryId !== 'all' ? `‘${categoryLabel}’ 카테고리의 ` : ''}
            모든 글 보기 &gt;
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default PostList
