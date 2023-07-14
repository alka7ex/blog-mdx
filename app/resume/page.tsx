import HeaderResume from "@/components/resume/Header";
import BodyResume from "@/components/resume/Body";
import TagSearch from "@/components/TagSearch";

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

export const generateMetadata = () => {
  return (
    {
      title: "Farhienza Haikal Resume",
      description: "Resume of Farhienza Haikal as Product Manager, which PM with a focus on improving user experience and handling internal system, proficient with connecting 3rd party tools to test and learn or lauch quick MVP, and experienced with both B2B and B2C Business",
    }
  )
}