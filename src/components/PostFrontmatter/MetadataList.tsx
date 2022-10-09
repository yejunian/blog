import React from 'react'

import * as styles from './MetadataList.module.scss'

type PostRestFrontmatterProps = {
  metadata: PostMetadataItem[]
}

export type PostMetadataItem = {
  key: string
  values?: string[] | string | null
}

const MetadataList = ({ metadata }: PostRestFrontmatterProps) => (
  <dl className={styles.root}>
    {metadata.reduce<React.ReactNode[]>((acc, { key, values }) => {
      if (!values || values.length === 0) {
        return acc
      }

      let valueArray: string[]
      if (typeof values === 'string') {
        valueArray = [values]
      } else {
        valueArray = values
      }

      acc.push(
        <div key={key} className={styles.pair}>
          <dt className={styles.key}>{key}</dt>
          {valueArray.map((value) => (
            <dd key={value} className={styles.value}>
              {value}
            </dd>
          ))}
        </div>
      )

      return acc
    }, [])}
  </dl>
)

export default MetadataList
