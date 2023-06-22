import Image from "next/image";
// import Blog from "@/components/Blog";
import qs from 'qs';
import allDocs, { Blog, allBlogs } from "contentlayer/generated";

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

import React from 'react'
import { notFound } from "next/navigation";
import { Mdx } from "@/components/ui/mdx";

export const getBlogFromParams = (slug: string) => {
  const blog = allBlogs.find((Blog) => Blog.slug === slug);

  if (!blog) notFound

  return (
    blog
  )
}


export const page = async ({ params }: Props) => {
  const blog = await getBlogFromParams(params.slug)
  return (
    <div className="container prose justify-center">
      <div>
        <Image className="container justify-center rounded-lg"
          src={blog.thumbnail}
          alt={blog.altthumbnail}
          width={300}
          height={200}
        />
      </div>
      <h1 className="prose prose-h1:">{blog.title}</h1>
      <Mdx code={blog.body.code} />
    </div>
  )
}
export default page;


// export async function generateMetadata({ params: { slug }}: Props) {
//   const blog = await getBlogFromParams(params.slug)
//   return {
//     title: meta.data[0].attributes.title,
//     description: meta.data[0].attributes.description,
//   };
// }

// const blog = ({ params: { slug,data,meta }}: Props) => {
//   return <Blog slug={slug} data={data} meta={meta}></Blog>;
// };


export const generateMetadata = async ({ params }: Props) => {
  const blog = await getBlogFromParams(params.slug)
  return (
    {
      title: blog.title,
      description: blog.description,
    }
  )
}
