import Link from "next/link";
import Image from "next/image";
import {
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import React from "react";
import { allBlogs } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";

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
    <div className="mx-auto">
      <div className="container grid w-auto h-auto grid-cols-1 p-5 mx-auto space-y-5 md:grid-cols-2 md:space-y-0 md:space-x-5">
        {blogs.map((blog) => (
          <div key={blog.slug} className="container m-auto rounded-2xl">
            <div className="container h-60 md:h-72 xl:h-96 relative rounded-2xl">
              <Link href={"/blog/" + blog.slug} className="">
                <Image
                  src={blog.thumbnail}
                  alt={blog.altthumbnail}
                  className="rounded-2xl object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority />
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
                    <h1>
                      {blog.title}
                    </h1>
                  </Link>
                  <div className="flex flex-row mt-3 space-x-2"> {/* Wrap the tags in a single div with flex layout */}
                    {blog.tags.map((tag) => (
                      <div className="flex flex-col md:flex-row mx-max"> {/* Use a single div for each tag */}
                        <Link href={"/tags?q=" + tag}>
                          <Button variant="link" className="justify-start p-1 w-auto h-auto text-xs text-foreground">
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