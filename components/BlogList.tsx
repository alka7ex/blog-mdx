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
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/posts?populate=*"
  );
  const jsonData = await res.json();
  // console.log(JSON.stringify(jsonData))
  return jsonData;
}

const BlogList = async ({ slug }) => {
  const jsonData = await fetchFeatured(slug);
  // console.log(meta_data);
  return (
    <div className="h-auto w-auto mx-auto">
      <div className="container grid grid-cols-1 mx-auto space-y-5 md:grid-cols-2 lg:space-y-0">
        {jsonData.data.slice(0, 4).map((data) => (
          <div className="flex flex-col">
            <CardTitle className="m-6">
              <Link href={"/blog/" + data.attributes.slug}>
                <h2 className="card-title">{data.attributes.title}</h2>
              </Link>
            </CardTitle>
            <CardContent className="">
              <p className="h-24 overflow-hidden">{data.attributes.content}</p>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
