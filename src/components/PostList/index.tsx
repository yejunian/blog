import { Link } from 'gatsby'
import React, { ReactNode, useMemo } from 'react'

import categoryMetadata from '../../blog-post/src/categoryMetadata'
import PostListItem, { PostListItemProps } from './PostListItem'

import * as styles from './PostList.module.scss'

type PostListProps = {
  categoryId?: string
  isRecent?: boolean
  items: PostListItemArray
  showMore?: boolean
  year?: number | string
}

export type PostListItemArray = PostListItemArrayEntry[]
export type PostListItemArrayEntry = PostListItemProps & { id: string }

const unknownCategoryText = '모르는 분류'

const deriveCategoryNode = (
  text: string | null | undefined,
  id: string | null | undefined
): ReactNode => {
  if (text) {
    return <Link to={`/category/${id}/`}>‘{text}’</Link>
  } else if (text === '') {
    return null
  } else {
    return `‘${unknownCategoryText}’`
  }
}

const concatenateWhenWhereNodes = (
  when: ReactNode,
  where: ReactNode
): ReactNode => {
  if (when && where) {
    return (
      <>
        {when} {where}
      </>
    )
  } else {
    return when || where
  }
}

const deriveHeadingNode = (
  categoryText: string | null | undefined,
  whenWhereNode: ReactNode
): ReactNode => {
  if (typeof categoryText === 'string') {
    return <>{whenWhereNode}에는 무엇을 끄적였나</>
  } else {
    return <>무엇을 끄적였나</>
  }
}

const PostList = ({
  categoryId,
  isRecent,
  items,
  showMore,
  year,
}: PostListProps) => {
  const whenNode = isRecent ? <>최근</> : year ? <>{year}년</> : null

  const categoryText = categoryId ? categoryMetadata.get(categoryId)?.label : ''
  const categoryNode = deriveCategoryNode(categoryText, categoryId)

  const whenWhereNode = concatenateWhenWhereNodes(whenNode, categoryNode)
  const headingLabelNode = deriveHeadingNode(categoryText, whenWhereNode)

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

      {showMore ? (
        <div className={styles.more}>
          <Link to={categoryId ? `/category/${categoryId}/` : `/post/`}>
            {categoryId ? `‘${categoryText}’ 분류의 ` : null}
            {isRecent ? '최근 ' : null}글 더 보기 &gt;
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default PostList
