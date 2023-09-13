import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allBlogs } from "@/.contentlayer/generated";
import { Button } from "@/components/ui/button";

export interface Props {
  params: {
    Blog: {
      title: string;
      slug: string;
      descriptions: string;
      tags: string[];
      date: string;
      featured: boolean;
      type: string;
      content: string;
      thumbnail: string;
      data?: any;
      meta?: any;
    };
  };
}

export const PageSize = 10;

const BlogList: React.FC<Props> = () => {
  // Sort the allBlogs array by date in descending order
  const sortedBlogs = allBlogs.slice().sort((a, b) => {
    // Convert date strings to Date objects for comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // Compare and return the comparison result
    return dateB - dateA;
  });

  return (
    <div>
      <div className="h-auto w-auto mx-auto flex flex-col">
        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:mx-52">
          {sortedBlogs.map((post) => (
            <Card key={post.slug} className="flex flex-col md:mx-5 mb-5">
              <CardHeader className="">
                <div className="container h-60 w-90 relative ">
                  <Link href={"/blog/" + post.slug} className="container">
                    <Image
                      src={post.thumbnail}
                      alt={post.altthumbnail}
                      className="rounded-t-lg object-cover"
                      fill
                      sizes="(max-width: 384px) 100vw, (max-width: 600px) 50vw, 33vw"
                    />
                  </Link>
                </div>
              </CardHeader>
              <CardTitle className="mx-6 mt-6 mb-12">
                <Link href={"/blog/" + post.slug}>
                  <h2 className="card-title">{post.title}</h2>
                </Link>
                <div className="flex flex-row mt-2 space-x-2">
                  {post.tags.map((tag) => (
                    <div key={tag} className="flex flex-col md:flex-row mx-max">
                      <Link href={"/tags?q=" + tag}>
                        <Button variant="link" className="justify-start p-1 w-auto h-auto text-xs text-foreground">
                          {tag}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardTitle>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
