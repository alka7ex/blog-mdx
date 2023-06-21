// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `blog/**/*.mdx`,
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
var Resume = defineDocumentType(() => ({
  name: "Resume",
  filePathPattern: `resume/**/*.mdx`,
  contentType: "mdx",
  fields: {
    bio: {
      name: "string",
      required: true
    },
    summary: {
      type: "string",
      required: true
    },
    skills: {
      type: "string",
      required: true
    },
    tools: {
      type: "string",
      required: true
    },
    education: {
      type: "string",
      required: true
    },
    experience: {
      type: "string",
      required: true
    },
    course: {
      type: "boolean",
      required: true
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./app/api/content",
  documentTypes: [Doc, Resume],
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
  Doc,
  Resume,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-YXWBUO7K.mjs.map
