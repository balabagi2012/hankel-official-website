import Banner from "@/components/Banner";
import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenCurriculum() {
  return (
    <Curriculum
      type="kindergarten"
      banner="/banners/kindergarten.png"
    ></Curriculum>
  );
}
