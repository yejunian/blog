import React, { useMemo } from 'react'

import categoryMetadata from '../../blog-post/src/categoryMetadata'

import * as styles from './CategoryList.module.scss'
import CategoryListItem from './CategoryListItem'

type CategoryListProps = {
  heading: string
}

const CategoryList = ({ heading }: CategoryListProps) => {
  const items = useMemo(() => {
    const result: React.ReactNode[] = []

    for (const [id, { label, description }] of categoryMetadata) {
      result.push(
        <CategoryListItem
          key={id}
          groupClassName={styles.itemGroup}
          categoryId={id}
          label={label}
          description={description}
        />
      )
    }

    return result
  }, [categoryMetadata])

  return (
    <div className={styles.root}>
      {heading ? <h2 className={styles.title}>{heading}</h2> : null}

      <dl className={styles.list}>{items}</dl>
    </div>
  )
}

export default CategoryList
