import { Link } from 'gatsby';
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from 'gatsby-plugin-image';
import React, { useRef } from 'react';

import * as styles from './PostListItem.module.scss';

export type PostListItemProps = {
  path?: string | null;
  date?: string | null;
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  thumbnail?: IGatsbyImageData | null;
  thumbnailAlt?: string | null;
};

const PostListItem = ({
  path,
  date,
  title,
  description,
  thumbnail,
  thumbnailAlt,
  keywords = [],
}: PostListItemProps) => {
  const linkRef = useRef<Link<unknown> & HTMLAnchorElement>(null);

  const handleRootClick: React.MouseEventHandler = (event) => {
    if (event.target !== linkRef.current) {
      linkRef.current?.click();
    }
  };

  return (
    <article className={styles.root} onClick={handleRootClick}>
      <div className={styles.text}>
        <h3 className={styles.title}>
          <Link ref={linkRef} to={path ?? '/404'}>
            {path ? null : '[대상 페이지 접근 불가] '}
            {title || '(제목 정보 없음)'}
          </Link>
        </h3>
        {description && <div className={styles.description}>{description}</div>}
        <div className={styles.metadata}>
          <div>{date || '(작성 날짜 정보 없음)'}</div>
          <div className={styles.keywords}>{keywords?.join(', ')}</div>
        </div>
      </div>

      <div className={styles.thumbnail}>
        {thumbnail ? (
          <GatsbyImage
            className={styles.imageRoot}
            image={thumbnail}
            alt={thumbnailAlt ?? ''}
          />
        ) : (
          <StaticImage
            className={styles.imageRoot}
            src="../../images/thumbnail-fallback.png"
            alt=""
            layout="fullWidth"
            breakpoints={[216, 432]}
          />
        )}
      </div>
    </article>
  );
};

export default PostListItem;
