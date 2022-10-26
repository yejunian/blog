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
        name: 'blog-post',
        path: './src/blog-post/src/',
      },
      __key: 'blog-post',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },

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

    'gatsby-plugin-sass',
    'gatsby-plugin-minify-classnames',

    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
              ignoreFileExtensions: [
                'avif',
                'webp',
                'png',
                'jpg',
                'jpeg',
                'bmp',
                'tiff',
                'tga',
              ],
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              disableBgImage: true,
              maxWidth: 696,
              quality: 80,
              srcSetBreakpoints: [696, 1392],
              withAvif: {
                quailty: 60,
              },
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          },
        ],
      },
    },

    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'avif'],
          breakpoints: [744, 1488],
          jpgOptions: {
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
