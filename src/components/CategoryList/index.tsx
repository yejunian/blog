import React, { useMemo } from 'react';

import categoryMetadata from '../../blog-post/src/categoryMetadata';
import * as styles from './CategoryList.module.scss';
import CategoryListItem from './CategoryListItem';

type CategoryListProps = {
  heading: string;
  categoryId?: string;
};

const CategoryList = ({ heading, categoryId }: CategoryListProps) => {
  const items = useMemo(() => {
    const result: React.ReactNode[] = [];

    for (const [id, { label, description }] of categoryMetadata) {
      if (!categoryId || categoryId !== id) {
        result.push(
          <CategoryListItem
            key={id}
            groupClassName={styles.itemGroup}
            categoryId={id}
            label={label}
            description={description}
          />,
        );
      }
    }

    return result;
  }, [categoryMetadata]);

  return (
    <div className={styles.root}>
      {heading ? <h2 className={styles.title}>{heading}</h2> : null}

      <dl className={styles.list}>
        {categoryId ? (
          <CategoryListItem
            groupClassName={styles.itemGroup}
            categoryId={''}
            label="전체"
            description="모든 분류의 글"
          />
        ) : null}
        {items}
      </dl>
    </div>
  );
};

export default CategoryList;
