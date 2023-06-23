import { dataHeaderresume } from "@/app/api/fetch";
import Image from "next/image";
import myprofile from '@/public/1682770822163.webp';


export interface ResumeData {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  bio: string;
  experience: string;
  skills: string;
  tools: string;
  education: string;
  course: string;
  createdAt: Date;
  updatedAt: Date;
  summary: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}



const HeaderResume: React.FC<Attributes> = async ({ }) => {
  const resumedatas = await dataHeaderresume();
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
            Farhienza haikal
          </h1>
          <p className="py-6 w-auto text-center md:text-left">
          APM with a focus on improving user experience and handling internal system, proficient with connecting 3rd party tools to test and learn, and experienced with both B2B and B2C Business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderResume;
