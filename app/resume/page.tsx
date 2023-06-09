import HeaderResume from "@/components/resume/Header";
import BodyResume from "@/components/resume/Body";

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

const page = async ({ bio,experience,skills,tools,education,course,createdAt,updatedAt,summary }: Attributes) => {
  return (
    <div className="flex flex-col w-auto mx-0 mt-5 space-y-5">
      <HeaderResume bio={bio} experience={experience} skills={skills} tools={tools} education={education} course={course} createdAt={createdAt} updatedAt={updatedAt} summary={summary}></HeaderResume>
      <BodyResume bio={bio} experience={experience} skills={skills} tools={tools} education={education} course={course} createdAt={createdAt} updatedAt={updatedAt} summary={summary}></BodyResume>
    </div>
  );
};
export default page;
