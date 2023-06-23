import Image from "next/image";
import allDocs, { allBlogs } from "contentlayer/generated";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import myprofile from '@/public/1682770822163_small.webp';

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
import Link from "next/link";

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
      <div className="container flex flex-cols mt-8 mb-12 mx-8 xl:pl-24">
        <Link href="/resume">
          <div className="avatar">
            <div className="container relative w-24 h-24 my-auto">
              <Image
                src={myprofile}
                alt="Farhienza Haikal"
                className="object-cover rounded-full"
                placeholder="blur"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </Link>
        <div className="container flex-col mx-8 my-auto">
          <h4 className="text-sm font-bold my-2 md:text-md">
            {/* {datas.} */}
          </h4>
          <Link href="/resume">
            <h2 className="text-xl font-bold my-2 md:text-2xl">
              Farhienza Haikal
            </h2>
            <h5 className="text-lg md:text-xl">
              Associate Product Manager @ RedDoorz
            </h5>
          </Link>
        </div>
      </div>
      <div className="container max-w-none prose justify-center">
        <div className="max-w-[600px] container relative rounded-2xl">
          <AspectRatio ratio={4 / 3}>
            <Image
              className="rounded-2xl object-cover"
              src={blog.thumbnail}
              alt={blog.altthumbnail}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
        </div>
        <div className="container max-w-[800px]">
          <h1 className="prose prose-h1:">{blog.title}</h1>
          <Mdx code={blog.body.code} />
        </div>
      </div>
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
