import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const datehour = z
  .string()
  .datetime({ offset: true })
  .regex(/\d{4,}-\d{2}-\d{2}T\d{2}\+09/);

const keywordLayer = z.union([
  z.array(z.literal("__EMPTY")).length(1),
  z.array(z.string()).nonempty(),
]);

const blogPost = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "src/data/blog-post/post",
  }),
  schema: z.object({
    // TODO: blog-post/metadata/category.ts를 가져와서 자동으로 적용할 방법 찾기.
    //       또는 카테고리를 JSON으로 관리하도록 변경.
    category: z.string(),
    slug: z.string(),
    thumbnail: z.optional(z.string()),
    thumbnailAlt: z.optional(z.string()),
    title: z.string(),
    description: z.string(),
    date: datehour,
    revisions: z.optional(
      z.array(
        z.object({
          date: datehour,
          message: z.string(),
        }),
      ),
    ),
    keywords: z.object({
      main: keywordLayer,
      sub: keywordLayer,
      misc: keywordLayer,
    }),
    noindex: z.boolean(),
  }),
});

export const collections = { blogPost };
