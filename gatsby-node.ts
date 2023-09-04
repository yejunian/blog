import { GatsbyNode, Node } from 'gatsby';

type MdxNode = Node & {
  frontmatter?: {
    date?: string;
  };
};

type DateField = {
  path: string;
  year: string;
  month: string;
  date: string;
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const mdxNode: MdxNode = node;
    const dateString: string | undefined = mdxNode.frontmatter?.date;

    if (!dateString) {
      throw new Error('`date` field of frontmatter is empty.');
    }

    const trimmedDate = dateString.trim();

    const value: DateField = {
      path: trimmedDate.slice(0, 10).replaceAll('-', '/'),
      year: trimmedDate.slice(0, 4),
      month: trimmedDate.slice(5, 7),
      date: trimmedDate.slice(8, 10),
    };

    createNodeField({
      node,
      value,
      name: `date`,
    });
  }
};
