import { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  // NOTE - Uncomment below when debugging build error
  // flags: {
  //   DEV_SSR: true,
  // },

  pathPrefix: '/blog',
  siteMetadata: {
    siteUrl: 'https://yejunian.github.io/',
    title: 'yejunian/blog',
    description: '',
    keywords: 'yejunian',
  },

  graphqlTypegen: true,

  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-post',
        path: './src/blog-post/src/',
      },
      __key: 'blog-post',
    },

    'gatsby-transformer-sharp',

    'gatsby-plugin-image',
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
        icon_options: {
          purpose: 'maskable',
        },
        legacy: false,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 696,
              quality: 80,
              srcSetBreakpoints: [552, 696, 1104, 1392],
              withAvif: {
                quailty: 60,
              },
              withWebp: {
                quailty: 80,
              },
            },
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-minify-classnames',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'avif', 'webp'],
          placeholder: 'blurred',
          breakpoints: [600, 744, 1200, 1488],
          jpgOptions: {
            quality: 80,
          },
          webpOptions: {
            quality: 80,
          },
          avifOptions: {
            quality: 60,
          },
        },
      },
    },
  ],
}

export default config
