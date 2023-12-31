// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `/app/api/content/blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string"
    },
    thumbnail: {
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
      type: "list",
      of: { type: "string" },
      required: true
    },
    date: {
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
var Resume = defineDocumentType(() => ({
  name: "Resume",
  filePathPattern: `/app/api/content/resume/**/*.mdx`,
  contentType: "mdx",
  fields: {
    bio: {
      type: "string",
      required: true
    },
    summary: {
      type: "string",
      required: true
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./app/api/content",
  documentTypes: [Blog, Resume],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
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
  Blog,
  Resume,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FED7SCFR.mjs.map
