import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import MetadataList, { PostMetadataItem } from './MetadataList'
import * as styles from './PostFrontmatter.module.scss'

type PostFrontmatterProps = {
  thumbnail?: IGatsbyImageData | null
  thumbnailAlt?: string | null
  title: string
  description?: string | null
  rest?: PostMetadataItem[] | null
}

const PostFrontmatter = ({
  thumbnail,
  thumbnailAlt,
  title,
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
      <h1 className={styles.title}>{title}</h1>

      {description && <p className={styles.description}>{description}</p>}

      {rest && <MetadataList metadata={rest} />}
    </div>
  </div>
)

export default PostFrontmatter
