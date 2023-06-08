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

export async function fetchFeatured() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&filters[featured][$eq]=true"
  );
  const jsonData = await res.json();
  // console.log(JSON.stringify(jsonData))
  return jsonData;
}

const Featured = async ({ slug }) => {
  const jsonData = await fetchFeatured(slug);
  // console.log(meta_data);
  return (
    <div className="">
      <div className="container grid w-auto h-auto grid-cols-1 p-5 mx-auto space-y-5 md:grid-cols-2 md:space-y-0 md:space-x-5 ">
        <div className="flex min-h-full m-auto rounded-2xl">
          <div className="m-auto">
            <Link href={"/blog/" + jsonData.data[0].attributes.slug}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_STRAPI_URL +
                  jsonData.data[0].attributes.thumbnail.data[0].attributes
                    .formats.small.url
                }
                width={
                  jsonData.data[0].attributes.thumbnail.data[0].attributes
                    .formats.small.width
                }
                height={
                  jsonData.data[0].attributes.thumbnail.data[0].attributes
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
              <Link href={"/blog/" + jsonData.data[0].attributes.slug}>
                <h2 className="card-title">{jsonData.data[0].attributes.title}</h2>
              </Link>
            </CardTitle>
            <CardContent className="">
              <p className="h-24 overflow-hidden">{jsonData.data[0].attributes.content}</p>
            </CardContent>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
