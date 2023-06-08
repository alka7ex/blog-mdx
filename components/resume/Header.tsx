import Image from "next/image";


interface ResumeData {
  data: {
    attributes: {
      experience: string;
      skills: string;
      tools: string;
      education: string;
      course: string;
      summary: string;
    };
  }[];
}

interface HeaderResumeProps {
  jsonData: ResumeData;
}

export async function fetchHeader(): Promise<ResumeData> {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/resumes");
  const jsonData = await res.json();
  // console.log(JSON.stringify(jsonData))
  return jsonData;
}

const HeaderResume: React.FC<HeaderResumeProps> = ({ jsonData }) => {
  const resumedatas = jsonData;
  // console.log(meta_data);
  return (
    <div className="mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row-reverse mx-auto">
        <Image
          src="/1682770822163.jpg"
          width={500}
          height={500}
          // className="max-w-sm shadow-2xl"
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
