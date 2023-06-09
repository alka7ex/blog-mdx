import Image from "next/image";
import Blog from "@/components/Blog";


export interface Props {
  params: {
    slug: string;
    data?:any;
    meta?: any;
  };
}


export async function generateMetadata({ params: { slug }}: Props) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL +
      "/api/posts?populate=*&filters[slug][$eq]=" +
      slug
  );
  const data = await res.json();
  const meta = data;
  return {
    title: meta.data[0].attributes.title,
    description: meta.data[0].attributes.description,
  };
}

const blog = ({ params: { slug,data,meta }}: Props) => {
  return <Blog slug={slug} data={data} meta={meta}></Blog>;
};

export default blog;