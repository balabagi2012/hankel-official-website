import Banner from "@/components/Banner";
import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolCurriculum() {
  return (
    <main className="pt-[200px]">
      <Banner size="small" src="/banners/school.png"></Banner>
      <Curriculum></Curriculum>
    </main>
  );
}
