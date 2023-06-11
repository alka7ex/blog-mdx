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
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/posts?populate=*"
  );
  const jsonData = await res.json();
  // console.log(JSON.stringify(jsonData))
  return jsonData;
}

const BlogList: React.FC<Props> = async ({ }: Props) => {
  const datas = await fetchFeatured();
  console.log(datas)
  // console.log(meta_data);
  return (
    <div className="h-auto w-auto mx-auto">
      <div className="container grid grid-cols-1 mx-auto space-y-5 md:grid-cols-2 lg:space-y-0">
        {datas.data.slice(0, 4).map((post) => (
          <div className="flex flex-col" key={post.id}>
            <CardTitle className="m-6">
              <Link href={"/blog/" + post.attributes.slug}>
                <h2 className="card-title">{post.attributes.title}</h2>
              </Link>
              <div className="flex flex-row"> {/* Wrap the tags in a single div with flex layout */}
                {post.attributes.tags.data.map((tag) => (
                  <div className="flex flex-row" key={tag.id}> {/* Use a single div for each tag */}
                    <Link href={"/tags?q=" + tag.attributes.name_tag}>
                      <Button className="w-auto h-auto">
                        {tag.attributes.name_tag.replace(/-/g, ' ')}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardTitle>
            <CardContent className="">
              <p className="h-24 overflow-hidden">{post.attributes.content}</p>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
