import Link from "next/link";
import Image from "next/image";
import {
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import React from "react";
import { dataFeatured } from "@/app/api/fetch";

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

const Featured: React.FC<Props> = async ({ }) => {
  const datas = await dataFeatured();
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
                    <div className="flex flex-row"> {/* Wrap the tags in a single div with flex layout */}
                      {post.attributes.tags.data.map((tag) => (
                        <div className="flex flex-col md:flex-row mx-max bg-transparent" key={tag.id}> {/* Use a single div for each tag */}
                          <Link href={"/tags?q=" + tag.attributes.name_tag}>
                            <Button className="justify-start p-1 w-auto h-auto text-xs">
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
