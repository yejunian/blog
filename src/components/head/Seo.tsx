import React from 'react'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import fallbackThumbnail from '../../images/thumbnail-fallback.png'

type SeoProps = {
  canonicalPath?: string | null
  title?: string | null
  description?: string | null
  keywords?: string[] | null
  thumbnail?: string | null
}

const Seo = ({
  canonicalPath: givenCanonicalPath,
  title: givenTitle,
  description: givenDescription,
  keywords: givenKeywords,
  thumbnail: givenThumbnail,
}: SeoProps) => {
  const siteMetadata = useSiteMetadata()

  const siteUrl = siteMetadata?.siteUrl || 'https://yejunian.github.io'

  const defaultCanonicalPath = '/blog/'
  const canonicalPath = givenCanonicalPath || defaultCanonicalPath
  const actualCanonicalUrl = `${siteUrl}${canonicalPath}`

  const baseTitle = siteMetadata?.title || 'yejunian/blog'
  const actualTitle = givenTitle ? `${givenTitle} | ${baseTitle}` : baseTitle

  const defaultDescription = siteMetadata?.description || ''
  const actualDescription = givenDescription || defaultDescription

  const defaultKeywords = siteMetadata?.keywords || 'yejunian'
  const actualKeywords =
    (givenKeywords && givenKeywords.join(',')) || defaultKeywords

  const defaultThumbnail = `${siteUrl}${fallbackThumbnail}`
  const actualThumbnail = givenThumbnail || defaultThumbnail

  return (
    <>
      <link rel="canonical" href={actualCanonicalUrl} />

      <title>{actualTitle}</title>
      {actualDescription && (
        <meta name="description" content={actualDescription} />
      )}
      {actualKeywords && <meta name="keywords" content={actualKeywords} />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={actualCanonicalUrl} />
      <meta property="og:title" content={actualTitle} />
      {actualDescription && (
        <meta property="og:description" content={actualDescription} />
      )}
      <meta property="og:image" content={actualThumbnail} />
      <meta property="og:locale" content="ko_KR" />
    </>
  )
}

export default Seo
