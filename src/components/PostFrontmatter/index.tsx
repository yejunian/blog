import React from 'react'

import MetadataList, { PostMetadataItem } from './MetadataList'
import * as styles from './PostFrontmatter.module.scss'

type PostFrontmatterProps = {
  thumbnail?: string
  title: string
  subtitle?: string
  description?: string
  rest: PostMetadataItem[]
}

const PostFrontmatter = ({
  thumbnail,
  title,
  subtitle,
  description,
  rest,
}: PostFrontmatterProps) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.thumbnail}
        role="presentation"
        src={thumbnail}
        width={1200}
        height={630}
      />

      <div className={styles.text}>
        <header className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>&mdash; {subtitle}</p>}
        </header>

        <p className={styles.description}>{description}</p>

        <MetadataList metadata={rest} />
      </div>
    </div>
  )
}

export default PostFrontmatter
