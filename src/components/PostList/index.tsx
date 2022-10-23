import React, { useMemo } from 'react'

import categoryMetadata from '../../blog-post/src/categoryMetadata'

import * as styles from './PostList.module.scss'
import PostListItem, { PostListItemProps } from './PostListItem'

type PostListProps = {
  heading?: string
  categoryId: string
  items: PostListItemArray
}

// TODO - Combine with PostMetadataItem type
export type PostListItemArray = PostListItemArrayEntry[]
export type PostListItemArrayEntry = PostListItemProps & { id: string }

const PostList = ({ heading, categoryId, items }: PostListProps) => {
  const categoryLabel = categoryMetadata.get(categoryId)?.label
  const fallbackHeadingPrefix =
    !heading && categoryLabel ? `${categoryLabel}에는 ` : ''

  const postListItems = useMemo(
    () =>
      items.map((item) => (
        <PostListItem
          key={item.id}
          path={item.path}
          date={item.date}
          title={item.title}
          subtitle={item.subtitle}
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
      <h2 className={styles.title}>
        <a href="#">{heading ?? `${fallbackHeadingPrefix}무엇을 끄적였나`}</a>
      </h2>

      <div className={styles.list}>
        {postListItems.length > 0 ? (
          postListItems
        ) : (
          <div className={styles.empty}>// 앗, 여기에는 글이 없어요!</div>
        )}
      </div>

      <div className={styles.more}>
        <a href="#">‘{categoryLabel}’ 카테고리의 모든 글 보기 &gt;</a>
      </div>
    </div>
  )
}

export default PostList
