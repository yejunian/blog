import React from 'react';

import useSiteMetadata from '../../hooks/useSiteMetadata';
import fallbackThumbnail from '../../images/thumbnail-fallback.png';
import joinKeywords from '../../utils/joinKeywords';

type SeoProps = {
  canonicalPath?: string | null;
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  thumbnailPath?: string | null;
  noindex?: boolean | null;
};

const Seo = ({
  canonicalPath: givenCanonicalPath,
  title: givenTitle,
  description: givenDescription,
  keywords: givenKeywords,
  thumbnailPath: givenThumbnailPath,
  noindex: givenNoindex,
}: SeoProps) => {
  const siteMetadata = useSiteMetadata();

  const siteUrl = siteMetadata?.siteUrl || 'https://yejunian.github.io';

  const defaultCanonicalPath = '/blog/';
  const canonicalPath = givenCanonicalPath || defaultCanonicalPath;
  const actualCanonicalUrl = `${siteUrl}${canonicalPath}`;

  const baseTitle = siteMetadata?.title || 'yejunian/blog';
  const actualTitle = givenTitle ? `${givenTitle} | ${baseTitle}` : baseTitle;

  const defaultDescription = siteMetadata?.description || '';
  const actualDescription = givenDescription || defaultDescription;

  const defaultKeywords = siteMetadata?.keywords || 'yejunian';
  const actualKeywords = joinKeywords(givenKeywords) || defaultKeywords;

  const defaultThumbnailPath = fallbackThumbnail;
  const thumbnailPath = givenThumbnailPath || defaultThumbnailPath;
  const actualThumbnail = `${siteUrl}${thumbnailPath}`;

  const actualNoindex = givenNoindex ?? false;

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

      {actualNoindex && <meta name="robots" content="noindex" />}
    </>
  );
};

export default Seo;
