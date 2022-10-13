import React from 'react'

import MetadataList, { PostMetadataItem } from './MetadataList'
import * as styles from './PostFrontmatter.module.scss'

type PostFrontmatterProps = {
  thumbnail?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  rest?: PostMetadataItem[] | null
}

const PostFrontmatter = ({
  thumbnail,
  title,
  subtitle,
  description,
  rest,
}: PostFrontmatterProps) => (
  <div className={styles.root}>
    {thumbnail && (
      <img
        className={styles.thumbnail}
        role="presentation"
        src={thumbnail}
        width={1200}
        height={630}
      />
    )}

    <div className={styles.text}>
      <header className={styles.titleGroup}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>&mdash; {subtitle}</p>}
      </header>

      {description && <p className={styles.description}>{description}</p>}

      {rest && <MetadataList metadata={rest} />}
    </div>
  </div>
)

export default PostFrontmatter
