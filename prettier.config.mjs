/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-astro", "@ianvs/prettier-plugin-sort-imports"],

  overrides: [
    // prettier-plugin-astro
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],

  // @ianvs/prettier-plugin-sort-imports
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^astro($|[:/])",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
};

export default config;
