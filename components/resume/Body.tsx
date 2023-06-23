import { dataHeaderresume } from "@/app/api/fetch";
import Markdown from "markdown-to-jsx";

export interface ResumeData {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  bio:        string;
  experience: string;
  skills:     string;
  tools:      string;
  education:  string;
  course:     string;
  createdAt:  Date;
  updatedAt:  Date;
  summary:    string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page:      number;
  pageSize:  number;
  pageCount: number;
  total:     number;
}


const BodyResume: React.FC<Attributes> = async ({ }) => {
  const resumedatas = await dataHeaderresume();
  return (
    <div className=" px-4 pb-16 mx-auto md:mx-12 lg:mx-16 my-auto">
      <h2 className="my-4 text-2xl font-bold" >Work Experience</h2>
      <div className="prose max-w-none">
        <Markdown>{resumedatas.data[0].attributes.experience}</Markdown>
      </div>
      <h2 className="my-4 text-2xl font-bold">Skills</h2>
      <div className="prose max-w-none">
        <Markdown>{resumedatas.data[0].attributes.skills}</Markdown>
      </div>
      <h2 className="my-4 text-2xl font-bold">Tools</h2>
      <div className="prose max-w-none">
        <Markdown>{resumedatas.data[0].attributes.tools}</Markdown>
      </div>
      <h2 className="my-4 text-2xl font-bold">Education</h2>
      <div className="prose max-w-none">
        <Markdown>{resumedatas.data[0].attributes.education}</Markdown>
      </div>
      <h2 className="my-4 text-2xl font-bold">Course</h2>
      <div className="prose max-w-none">
        <Markdown>{resumedatas.data[0].attributes.course}</Markdown>
      </div>
    </div>
  );
};

export default BodyResume;
