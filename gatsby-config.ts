import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  pathPrefix: '/blog',
  siteMetadata: {
    title: 'yejunian/blog',
    siteUrl: 'https://yejunian.github.io/blog/',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'yejunian',
        short_name: 'yejunian',
        start_url: '/blog/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}

export default config
