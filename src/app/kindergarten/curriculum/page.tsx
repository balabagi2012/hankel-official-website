import Banner from "@/components/Banner";
import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenCurriculum() {
  return (
    <main className="pt-[200px]">
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <Curriculum type="kindergarten"></Curriculum>
    </main>
  );
}
