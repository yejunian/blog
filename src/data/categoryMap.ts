import { getEntry } from "astro:content";

export type CategoryItem = {
  label: string;
  description: string;
};

const categoryMap = new Map<string, CategoryItem>(
  (await getEntry("category", "category"))?.data.map(({ id, ...value }) => [
    id,
    value,
  ]),
);

export default categoryMap;
