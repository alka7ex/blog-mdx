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


const BodyResume = async ({ bio, summary, Resume, body }: Props) => {
  const blogs = await getResumeFromParams();
  return (
    <div className=" px-4 pb-16 mx-auto md:mx-12 lg:mx-16 my-auto">
      <Mdx code={blogs.body.code} />
    </div>
  );
};

export default BodyResume;
