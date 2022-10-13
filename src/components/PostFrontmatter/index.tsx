import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import MetadataList, { PostMetadataItem } from './MetadataList'
import * as styles from './PostFrontmatter.module.scss'

type PostFrontmatterProps = {
  thumbnail?: IGatsbyImageData | null
  thumbnailAlt?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  rest?: PostMetadataItem[] | null
}

const PostFrontmatter = ({
  thumbnail,
  thumbnailAlt,
  title,
  subtitle,
  description,
  rest,
}: PostFrontmatterProps) => (
  <div className={styles.root}>
    {thumbnail && (
      <GatsbyImage
        className={styles.thumbnail}
        role="presentation"
        alt={thumbnailAlt ?? ''}
        image={thumbnail}
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
