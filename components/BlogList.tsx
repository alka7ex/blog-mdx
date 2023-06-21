"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { dataBloglist } from "@/app/api/fetch";
import { dataPagination } from "@/app/api/fetch";
import { QueryClient, QueryClientProvider, useQuery, dehydrate, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PageButton from "@/components/PageButton";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export interface Props {
  data: PropsDatum[];
  meta: Meta;
}

export interface PropsDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  title: string;
  slug: string;
  content: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  altthumbnail: string;
  descriptions: null | string;
  thumbnail: Thumbnail;
  tags: Propstags;
}

export interface Thumbnail {
  data: ThumbnailDatum[];
}

export interface ThumbnailDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null | string;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface UpperPrpos {
  props: Props;
}

export interface Propstags {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name_tag: string;
  createdAt: Date;
  updatedAt: Date;
}



const BlogList: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const fetchProjects = () => {
    return fetch(process.env.NEXT_PUBLIC_STRAPI_URL +
      `/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`)
      .then((res) => res.json());
  };

  const {
    isLoading,
    isError,
    error,
    isPreviousData,
    isFetching,
    isRefetching,
    data
  } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;

  }
  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => prev - 1);
  const pagesArray = Array(data.meta.pagination.pageCount).fill(0).map((_, index) => index + 1);
  console.log("API Response", data);
  console.log("Fetching", isFetching);
  console.log("refetching", isRefetching);
  console.log("page number: ", page)
  return (
    <div>
      <div className="h-auto w-auto mx-auto flex flex-col">
        <div className="container grid grid-cols-1 mx-auto space-y-5 md:grid-cols-2 lg:space-y-0">
          {data.data.map((post) => (
            <div className="flex flex-col" key={post.id}>
              <CardHeader>
                <Link href={"/blog/" + post.attributes.slug}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_STRAPI_URL +
                      post.attributes.thumbnail.data[0].attributes.url
                    }
                    width={
                      post.attributes.thumbnail.data[0].attributes
                        .formats.small.width
                    }
                    height={
                      post.attributes.thumbnail.data[0].attributes
                        .formats.small.height
                    }
                    alt="Picture of the author"
                    className="rounded-2xl"
                  />
                </Link>
              </CardHeader>
              <CardTitle className="m-6">
                <Link href={"/blog/" + post.attributes.slug}>
                  <h2 className="card-title">{post.attributes.title}</h2>
                </Link>
                <div className="flex flex-row"> {/* Wrap the tags in a single div with flex layout */}
                  {post.attributes.tags.data.map((tag) => (
                    <div className="flex flex-col md:flex-row mx-max bg-transparent" key={tag.id}> {/* Use a single div for each tag */}
                      <Link href={"/tags?q=" + tag.attributes.name_tag}>
                        <Button className="justify-start p-1 w-auto h-auto text-xs  bg-transparent">
                          {tag.attributes.name_tag.replace(/-/g, ' ')}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardTitle>
              <CardContent className="">
                <div className="h-24 overflow-hidden">{post.attributes.content}</div>
              </CardContent>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-auto">
          <div className="join flex justify-center">
            <Button className="join-item" variant="outline" onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;&lt;</Button>
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData || page === pg} />)}
            <Button className="join-item" variant="outline" onClick={nextPage} disabled={isPreviousData || page === data.meta.pagination.pageCount}>&gt;&gt;</Button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;