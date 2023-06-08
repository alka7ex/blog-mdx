import Image from "next/image";
import Link from "next/link";

export async function fetchBlog(slug) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
    "/api/posts?populate=*&filters[slug][$eq]=" +
    slug
  );
  const jsonData = await res.json();
  // console.log(JSON.stringify(jsonData))
  return jsonData;
}

const Blog = async ({ slug }) => {
  const jsonData = await fetchBlog(slug);
  // console.log(meta_data);
  return (
    <div className="">
      <div className="container flex flex-cols mt-8 mb-12 mx-8 xl:pl-24">
        <Link href="/resume">
          <div className="avatar">
            <div className="w-24 h-24 my-auto rounded-full">
              <Image
                src="/1682770822163.jpg"
                width={500}
                height={500}
                // className="max-w-sm shadow-2xl"
                alt="Farhienza Haikal"
              />
            </div>
          </div>
        </Link>
        <div className="container flex-col mx-8 my-auto">
          <h4 className="text-sm font-bold my-2 md:text-md">
            {jsonData.data[0].attributes.createdAt}
          </h4>
          <Link href="/resume">
            <h2 className="text-xl font-bold my-2 md:text-2xl">
              Farhienza Haikal
            </h2>
            <h5 className="text-lg md:text-xl">
              Associate Product Manager @ RedDoorz
            </h5>
          </Link>
        </div>
      </div>
      <div>
        <div className="container px-4 pb-16 mx-auto">
          <Link href={"/blog/" + jsonData.data[0].attributes.slug}>
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_URL +
                jsonData.data[0].attributes.thumbnail.data[0].attributes.url
              }
              width={549}
              height={309}
              alt={jsonData.data[0].attributes.altthumbnail}
              className="rounded-2xl mx-auto"
            />
          </Link>
          <div className="mx-auto prose prose-2xl:">
            <h1 className="my-8 text-2xl font-bold prose prose-h1:">
              {jsonData.data[0].attributes.title}
            </h1>
            <p className="max-w-none prose prose-p:">
              {jsonData.data[0].attributes.content}
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Blog;