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
import React from "react";
import { json } from "stream/consumers";
import { data } from "autoprefixer";
import TagSearch from "./TagSearch";


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


export async function fetchFeatured(): Promise<Props> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&filters[featured][$eq]=true"
  );
  const jsonData = await res.json();
  return jsonData;
}

const Featured: React.FC<Props> = async ({ }) => {
  const datas = await fetchFeatured();
  console.log("data tagging ", datas.data[0].attributes.tag)
  return (
    <div className="">
      <div className="container grid w-auto h-auto grid-cols-1 p-5 mx-auto space-y-5 md:grid-cols-2 md:space-y-0 md:space-x-5 ">
        <div className="flex min-h-full m-auto rounded-2xl">
          <div className="m-auto">
            <Link href={"/blog/" + datas.data[0].attributes.slug}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_STRAPI_URL +
                  datas.data[0].attributes.thumbnail.data[0].attributes.url
                }
                width={
                  datas.data[0].attributes.thumbnail.data[0].attributes
                    .formats.small.width
                }
                height={
                  datas.data[0].attributes.thumbnail.data[0].attributes
                    .formats.small.height
                }
                alt={datas.data[0].attributes.altthumbnail}
                className="rounded-2xl"
              />
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex min-h-full m-auto">
            <div className="flex flex-col">
              <CardTitle className="m-6">
                <div className="flex flex-row">
                  {datas.data.map((post) => (
                    <div className="flex flex-row" key={post.id}>
                      {post.attributes.tags.data.map((tag) => (
                        <div key={tag.id}>
                          <Link href={"/tags?q=" + tag.attributes.name_tag}>
                            <Button className="w-auto h-auto">
                              {tag.attributes.name_tag.replace(/-/g, ' ')}
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <Link href={"/blog/" + datas.data[0].attributes.slug}>
                  <h2 className="card-title">{datas.data[0].attributes.title}</h2>
                </Link>
              </CardTitle>
              <CardContent className="">
                <p className="h-24 overflow-hidden">{datas.data[0].attributes.content}</p>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Featured;
