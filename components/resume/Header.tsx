import { dataHeaderresume } from "@/app/api/fetch";
import Image from "next/image";


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



const HeaderResume: React.FC<Attributes> = async ({  }) => {
  const resumedatas = await dataHeaderresume();
  return (
    <div className="mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row-reverse mx-auto">
        <Image
          src="/1682770822163.webp"
          width={500}
          height={500}
          alt="Farhienza Haikal"
          className="max-w-sm rounded-2xl h-72 md:h-96 w-max mx-auto object-contain shadow-2xl"
        />
        <div className="mx-auto md:mx-12 lg:mx-16 my-auto">
          <h1 className="text-5xl font-bold text-center md:text-left">
            Farhienza haikal
          </h1>
          <p className="py-6 w-auto text-center md:text-left">
            {resumedatas.data[0].attributes.summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderResume;
