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
          <div>
            <CardHeader>
              <Link
                href={"/blog/" + data.attributes.slug}
              >
                <Image
                  className="h-48 w-full object-cover rounded-lg"
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL +
                    data.attributes.thumbnail.data[0].attributes.formats.thumbnail
                      .url
                  }
                  width={
                    data.attributes.thumbnail.data[0].attributes.formats.thumbnail
                      .width
                  }
                  height={
                    data.attributes.thumbnail.data[0].attributes.formats.thumbnail
                      .height
                  }
                  alt={data.attributes.altthumbnail}
                />
              </Link>
              <CardTitle>
                <Link href={"/blog/" + data.attributes.slug}>
                  <h2 className="card-title truncate">{data.attributes.title}</h2>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <p className="h-32 overflow-hidden">{data.attributes.content}</p>
            </CardContent>
            <CardFooter>
              <Link href={"/blog/" + data.attributes.slug}>
                <div className="card-actions justify-end">
                  <Button
                    className="btn btn-primary"
                    href={"/blog/" + data.attributes.slug}
                  >
                    Read More
                  </Button>
                </div>
              </Link>
            </CardFooter>
          </div>

        ))}
      </div>
    </div>
  );
};

export default BlogList;
