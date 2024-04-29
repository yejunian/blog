import categoryMetadata from '../blog-post/src/categoryMetadata';
import { PostListItemArrayEntry } from '../components/PostList';
import formatDatetime from './formatDatetime';

const getPostListItemArrayFromNode = (
  node: Queries.Mdx,
): PostListItemArrayEntry => {
  const id = node.id;
  const slug = node.frontmatter?.slug ?? null;

  const category =
    node.frontmatter?.category &&
    categoryMetadata.get(node.frontmatter.category)?.label;

  const datePath = node.fields?.date?.path ?? null;
  const formattedDate = node.frontmatter?.date
    ? formatDatetime(node.frontmatter.date)
    : null;

  const title = node.frontmatter?.title ?? null;
  const description = node.frontmatter?.description ?? null;

  const mainKeywords: string[] = node.frontmatter?.keywords?.main
    ? (node.frontmatter.keywords.main.filter((value) =>
        value ? true : false,
      ) as string[])
    : [];

  const thumbnail =
    node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData ?? null;
  const thumbnailAlt = node.frontmatter?.thumbnailAlt ?? null;

  return {
    id,
    category,
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
