import { MetadataRoute } from 'next'
import { allBlogs } from "contentlayer/generated";
export interface Props {
  params: {
    title: string;
    slug: string;
    descriptions: string;
    tags: string[];
    date: string;
    featured: boolean;
    type: string;
    content: string;
    thumbnail: string;
    Blog: string;
    data?: any;
    meta?: any;
  };
}
 
export default async function sitemap({ params }: Props) {
  const baseUrl = 'https://farhienza-haikal.my.id'
  const posts = await allBlogs;
  const postsUrls = posts?.map((post) => {
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
    };
  }) ?? [];
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search?q=`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tags?q=`,
      lastModified: new Date(),
    },
    ...postsUrls,
  ]
}