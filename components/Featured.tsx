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

interface HomepageData {
  data: [
    {
      attributes: {
        title: string;
        slug: string;
        content: string;
        featured: boolean;
        createdAt: Date;
        updatedAt: Date;
        altthumbnail: string;
        descriptions: null | string;
        thumbnail: {
          data: [
            {
              id: number;
              attributes: {
                name: string;
                alternativeText: null | string;
                caption: null;
                width: number;
                height: number;
                hash: string;
                ext: string;
                mime: string;
                size: number;
                url: string;
                previewUrl: null;
                provider: string;
                provider_metadata: null;
                createdAt: Date;
                updatedAt: Date;
                formats: {
                  thumbnail: {
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
                  small: {
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
                }
              }
            }
          ];
        };
      };
    }
  ];
}

interface FeaturedHomepageProps {
  jsonData: HomepageData;
}

export async function fetchFeatured(): Promise<HomepageData> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&filters[featured][$eq]=true"
  );
  const jsonData = await res.json();
  return jsonData;
}

const Featured: React.FC<FeaturedHomepageProps> = async ({ jsonData }) => {
  const datas = await fetchFeatured();
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
                alt="Picture of the author"
                className="rounded-2xl"
              />
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex min-h-full m-auto">
            <div className="flex flex-col">
              <CardTitle className="m-6">
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
    </div>
  );
};

export default Featured;
