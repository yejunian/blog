import Giscus from '@giscus/react'
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby'
import React, { useMemo } from 'react'

import Layout from '../../../components/Layout'
import PostFrontmatter from '../../../components/PostFrontmatter'
import { PostMetadataItem } from '../../../components/PostFrontmatter/MetadataList'
import Seo from '../../../components/head/Seo'
import joinKeywords from '../../../utils/joinKeywords'

import * as styles from './PostPage.module.scss'

type PostPageDataType = {
  mdx: Queries.Mdx
}

const defaultTitle = '제목이 없는 글'

const PostPage = ({ children, data }: PageProps<PostPageDataType>) => {
  const frontmatter = data.mdx.frontmatter

  const revisions = useMemo(() => {
    if (typeof frontmatter?.revisions?.length === 'number') {
      const recent = frontmatter.revisions[frontmatter.revisions.length - 1]
      const date = recent?.date

      if (date) {
        return recent.message ? [date, recent.message] : [date]
      } else {
        return null
      }
    } else {
      return null
    }
  }, [frontmatter?.revisions])

  const keywords = useMemo(() => {
    const mainKeywords = joinKeywords(frontmatter?.keywords?.main)
    const subKeywords = joinKeywords(frontmatter?.keywords?.sub)
    // const miscKeywords = joinKeywords(frontmatter?.keywords?.misc)

    if (mainKeywords && subKeywords) {
      return [`${mainKeywords},`, subKeywords]
    } else if (mainKeywords && !subKeywords) {
      return [mainKeywords]
    } else if (!mainKeywords && subKeywords) {
      return ['(메인 키워드 없음)', subKeywords]
    } else {
      return null
    }
  }, [frontmatter?.keywords])

  const restFrontmatter: PostMetadataItem[] = [
    { key: '최초 게시', values: frontmatter?.date },
    { key: '최종 수정', values: revisions },
    { key: '키워드', values: keywords },
  ]

  return (
    <Layout mainClassName={styles.root}>
      <article className={styles.post}>
        <PostFrontmatter
          thumbnail={frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData}
          thumbnailAlt={frontmatter?.thumbnailAlt}
          title={frontmatter?.title ?? defaultTitle}
          description={frontmatter?.description}
          rest={restFrontmatter}
        />

        <hr />

        <div className={styles.postBody}>{children}</div>
      </article>

      <section className={styles.comment}>
        <Giscus
          repo="yejunian/blog-post"
          repoId="R_kgDOIHuXOg"
          category="Comments"
          categoryId="DIC_kwDOIHuXOs4CSTDL"
          mapping="specific"
          term={`${data.mdx.fields?.date?.path}/${frontmatter?.slug}`}
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </section>
    </Layout>
  )
}

export const Head: HeadFC<PostPageDataType> = ({
  data,
  location,
}: HeadProps<PostPageDataType>) => {
  const keywords = useMemo(
    () =>
      [
        data.mdx.frontmatter?.keywords?.main,
        data.mdx.frontmatter?.keywords?.sub,
        data.mdx.frontmatter?.keywords?.misc,
      ].reduce<string[]>((acc, partial) => {
        if (Array.isArray(partial)) {
          acc.push(...partial)
        }
        return acc
      }, []),
    [data.mdx.frontmatter?.keywords]
  )

  return (
    <Seo
      canonicalPath={
        location.pathname.endsWith('/')
          ? location.pathname.slice(0, -1)
          : location.pathname
      }
      title={data.mdx.frontmatter?.title?.trim()}
      description={data.mdx.frontmatter?.description?.trim()}
      keywords={keywords}
      thumbnailPath={data.mdx.frontmatter?.thumbnail?.publicURL}
      noindex={data.mdx.frontmatter?.noindex}
    />
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      fields {
        date {
          path
          year
          month
          date
        }
      }
      frontmatter {
        slug
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        thumbnailAlt
        title
        description
        date(formatString: "YYYY년 M월 D일 H시", locale: "ko-KR")
        revisions {
          date(formatString: "YYYY년 M월 D일 H시", locale: "ko-KR")
          message
        }
        keywords {
          main
          sub
          misc
        }
        noindex
      }
    }
  }
`

export default PostPage
