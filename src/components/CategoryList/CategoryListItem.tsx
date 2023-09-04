import { Link } from 'gatsby';
import React, { useRef } from 'react';

type CategoryListItemProps = {
  groupClassName: string;
  categoryId?: string;
  label: string;
  description: string;
};

const CategoryListItem = ({
  groupClassName,
  categoryId,
  label,
  description,
}: CategoryListItemProps) => {
  const linkRef = useRef<Link<unknown> & HTMLAnchorElement>(null);

  const handleGroupClick: React.MouseEventHandler = (event) => {
    if (event.target !== linkRef.current) {
      linkRef.current?.click();
    }
  };

  return (
    <div className={groupClassName} onClick={handleGroupClick}>
      <dt>
        <Link
          ref={linkRef}
          to={categoryId ? `/category/${categoryId}/` : '/post/'}
        >
          {label}
        </Link>
      </dt>
      <dd>{description}</dd>
    </div>
  );
};

export default CategoryListItem;
