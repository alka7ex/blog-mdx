import { dataHeaderresume } from "@/app/api/fetch";
import Image from "next/image";
import myprofile from '@/public/1682770822163.webp';
import { allResumes } from "@/.contentlayer/generated";
import { Mdx } from "../ui/mdx";
import { notFound } from "next/navigation";

export interface Props {
  bio: string;
  summary: string;
  Resume: string;
  body: string;
}

export const getResumeFromParams = () => {
  const blog = allResumes[0];

  if (!blog) notFound

  return (
    blog
  )
}



const HeaderResume = async ({ bio, summary, Resume, body }: Props) => {
  const blogs = await getResumeFromParams();
  return (
    <div className=" mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row-reverse mx-auto">
        <div className="container relative h-72 md:h-96">
          <Image
            src={myprofile}
            alt="Farhienza Haikal"
            className="max-w-sm rounded-2xl w-max mx-auto object-cover shadow-2xl"
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mx-auto md:mx-12 lg:mx-16 my-auto">
          <h1 className="text-5xl font-bold text-center md:text-left">
            {blogs.bio}
          </h1>
          <p className="py-6 w-auto text-center md:text-left">
          {blogs.summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderResume;
