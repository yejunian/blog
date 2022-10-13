import { graphql, useStaticQuery } from 'gatsby'

type SiteMetadataQuery = {
  site: Queries.Site
}

const useSiteMetadata = () => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          description
          keywords
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
