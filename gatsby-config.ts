import { GatsbyConfig } from 'gatsby';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
import remarkHeadingId from 'remark-heading-id';

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
  trailingSlash: 'never',

  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-post',
        path: './src/blog-post/post/',
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
        mdxOptions: {
          remarkPlugins: [
            [remarkGfm, { singleTilde: false }],
            remarkHeadingId,
            // TODO - When Gatsby fully supports ESM, remove `remark-footnotes`
            //        and upgrade `remark-gfm`.
            remarkFootnotes,
          ],
          remarkRehypeOptions: {
            clobberPrefix: '',
            footnoteBackLabel: '본문으로',
            footnoteLabel: '각주',
            footnoteLabelProperties: { clasName: undefined },
          },
        },

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
              withAvif: { quality: 60 },
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

    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-K84ZMQZ9P3'],
      },
    },
  ],
};

export default config;
