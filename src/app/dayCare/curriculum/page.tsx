import Banner from "@/components/Banner";
import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareCurriculum() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <Curriculum></Curriculum>
    </main>
  );
}
