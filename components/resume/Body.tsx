import Markdown from "markdown-to-jsx";

interface ResumeData {
  data: {
    attributes: {
      experience: string;
      skills: string;
      tools: string;
      education: string;
      course: string;
    };
  }[];
}

interface BodyResumeProps {
  jsonData: ResumeData;
}

async function fetchBody(): Promise<ResumeData> {
  const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_URL + "/api/resumes");
  const jsonData = await res.json();
  return jsonData;
}

const BodyResume: React.FC<BodyResumeProps> = async ({ jsonData }) => {
  const resumedatas = await fetchBody();
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
