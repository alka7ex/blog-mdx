// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings/index.js";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Doc = defineDocumentType(() => ({
  name: "doc",
  filePathPattern: `complete-nextjs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    slug: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    tags: {
      type: "string",
      required: true
    },
    date: {
      type: "string",
      required: true
    },
    content: {
      type: "string",
      required: true
    },
    altthumbnail: {
      type: "string",
      required: true
    },
    featured: {
      type: "boolean",
      required: true
    }
  }
}));
var contentlayer_config_default = makeSoure({
  contentDirPath: "content/blog",
  documentType: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          theme: "github-dark",
          onVisitLine: (node) => {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className.push("word--highlighted");
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Doc,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-6LCVHUA2.mjs.map