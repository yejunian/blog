// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://docs.astro.build/en/reference/configuration-reference/
// https://docs.astro.build/ko/reference/configuration-reference/
export default defineConfig({
  site: "https://yejunian.github.io",
  base: "/blog/",

  markdown: {
    shikiConfig: {
      // TODO: 다크 모드 추가 시 코드 블록 테마 대응
      theme: "github-light",
      // themes: {
      //   light: "github-light",
      //   dark: "github-dark",
      // },
    },
    smartypants: false,
    remarkRehype: {
      footnoteLabel: "각주",
      footnoteBackLabel(referenceIndex, rereferenceIndex) {
        return (
          "각주 " +
          (referenceIndex + 1) +
          (rereferenceIndex > 1 ? "-" + rereferenceIndex : "") +
          "의 본문으로 돌아가기"
        );
      },
    },
  },

  integrations: [react(), mdx()],
});
