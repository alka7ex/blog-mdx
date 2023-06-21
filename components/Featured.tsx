import Link from "next/link";
import Image from "next/image";
import {
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import React from "react";
import { Props, dataFeatured } from "@/app/api/fetch";
import { allBlogs } from "@/.contentlayer/generated";
import { notFound, useRouter } from "next/navigation";
import Blog from "./Blog";

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



export interface Props {
  params: {
    title: string;
    slug: string;
    description: string;
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

export const getBlogFromParams = () => {
  const blogs = allBlogs.filter((blog) => blog.featured === true);
  if (blogs.length === 0) {
    notFound();
  }
  return blogs;
};

const Featured: React.FC<Props> = () => {
  const blogs = getBlogFromParams();
  return (
    <div className="">
      <div className="container grid w-auto h-auto grid-cols-1 p-5 mx-auto space-y-5 md:grid-cols-2 md:space-y-0 md:space-x-5">
        {blogs.map((blog) => (
          <div key={blog.slug} className="flex min-h-full m-auto rounded-2xl">
            <div className="m-auto">
              <Link href={"/blog/" + blog.slug}>
                <Image
                  src={blog.thumbnail}
                  width={600}
                  height={400}
                  alt="Picture of the author"
                  className="rounded-2xl"
                />
              </Link>
            </div>
          </div>
        ))}
        {blogs.map((blog) => (
          <div key={blog.slug} className="">
            <div className="flex min-h-full m-auto">
              <div className="flex flex-col">
                <CardTitle className="m-6">
                  <Link href={"/blog/" + blog.slug}>
                    {blog.title}
                  </Link>
                  <div className="flex flex-row"> {/* Wrap the tags in a single div with flex layout */}
                    {blog.tags.map((tag) => (
                      <div className="flex flex-col md:flex-row mx-max bg-transparent"> {/* Use a single div for each tag */}
                        <Link href={"/tags?q=" + tag}>
                          <Button className="justify-start p-1 w-auto h-auto text-xs  bg-transparent">
                            {tag}
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardTitle>
                <CardContent className="">
                  <p className="h-24 overflow-hidden">{blog.description}</p>
                </CardContent>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;