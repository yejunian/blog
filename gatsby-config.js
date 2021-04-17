module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `&#51456;`,
    description: `leeye51456의 블로그입니다. 아직은 뭘 올릴까 생각하면서 아무거나 쓰는 중입니다.`,
    author: `leeye51456`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `&#51456;`,
        short_name: `&#51456;`,
        start_url: `/blog/`,
        background_color: `#6da39f`,
        theme_color: `#6da39f`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
};
