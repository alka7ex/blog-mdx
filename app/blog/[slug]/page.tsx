import Image from "next/image";
import Blog from "@/components/Blog";
import qs from 'qs';
import allDocs, { allBlogs } from "contentlayer/generated";

export interface Props {
  params: {
    title: string;
    slug: string;
    descriptions: string;
    tags: string[];
    date: string;
    featured: boolean;
    type: string;
    content : string;
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
    <div>
      <Image className="container justify-center"
        src={blog.thumbnail}
        alt={blog.altthumbnail}
        width={300}
        height={200}
      />
      <div>{blog.title}</div>
      <Mdx code={blog.body.code} />
    </div>
  )
}



// export async function generateMetadata({ params: { slug }}: Props) {
//   const query = qs.stringify({
//     filters: {
//     },
//     populate: ["tags"],
//   },);
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_STRAPI_URL + `/api/posts?${query}`
//   );
//   const meta = await res.json();
//   return {
//     title: meta.data[0].attributes.title,
//     description: meta.data[0].attributes.description,
//   };
// }

// const blog = ({ params: { slug,data,meta }}: Props) => {
//   return <Blog slug={slug} data={data} meta={meta}></Blog>;
// };

export default page;