import { PostListItemArrayEntry } from '../components/PostList';
import formatDatetime from './formatDatetime';

const getPostListItemArrayFromNode = (
  node: Queries.Mdx,
): PostListItemArrayEntry => {
  const datePath = node.fields?.date?.path ?? null;
  const formattedDate = node.frontmatter?.date
    ? formatDatetime(node.frontmatter.date)
    : null;
  const description = node.frontmatter?.description ?? null;
  const mainKeywords: string[] = node.frontmatter?.keywords?.main
    ? (node.frontmatter.keywords.main.filter((value) =>
        value ? true : false,
      ) as string[])
    : [];
  const slug = node.frontmatter?.slug ?? null;
  const thumbnail =
    node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData ?? null;
  const thumbnailAlt = node.frontmatter?.thumbnailAlt ?? null;
  const title = node.frontmatter?.title ?? null;
  const id = node.id;

  return {
    id,
    description,
    thumbnail,
    thumbnailAlt,
    path: `/post/${datePath}/${slug}`,
    date: formattedDate,
    title: title,
    keywords: mainKeywords,
  };
};

export default getPostListItemArrayFromNode;
