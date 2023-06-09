import HeaderResume from "@/components/resume/Header";
import BodyResume from "@/components/resume/Body";

const page = async () => {
  return (
    <div className="flex flex-col w-auto mx-0 mt-5 space-y-5">
      <HeaderResume></HeaderResume>
      <BodyResume></BodyResume>
    </div>
  );
};
export default page;
