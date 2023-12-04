import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenCurriculum() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
    </main>
  );
}
