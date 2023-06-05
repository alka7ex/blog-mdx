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
      <div className="container grid grid-cols-1 mx-auto space-y-5 lg:grid-cols-2 lg:space-y-0">
        {jsonData.data.slice(0, 4).map((data) => (
          <Card className="flex flex-col md:flex-row md:w-3/4">
            <Link
              href={"/blog/" + data.attributes.slug}
            >
              <Image
                className="h-48 w-auto md:w-48 rounded-lg"
                src={
                  process.env.NEXT_PUBLIC_STRAPI_URL +
                  data.attributes.thumbnail.data[0].attributes.formats.thumbnail
                    .url
                }
                width={100}
                height={100}
                alt={data.attributes.altthumbnail}
              />
            </Link>
            <div className="flex flex-row">
              <CardTitle>
                <Link href={"/blog/" + data.attributes.slug}>
                  <h2 className="card-title truncate">{data.attributes.title}</h2>
                </Link>
              </CardTitle>
              <CardContent className="">
                <p className="h-32 overflow-hidden">{data.attributes.content}</p>
              </CardContent>
              <CardFooter>
                <Link href={"/blog/" + data.attributes.slug} className="container flex card-actions justify-end">
                  <div >
                    <Button
                      variant="outline">
                      Read More
                    </Button>
                  </div>
                </Link>
              </CardFooter>
            </div>


          </Card>

        ))}
      </div>
    </div>
  );
};

export default BlogList;
