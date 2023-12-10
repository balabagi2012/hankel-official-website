import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryCurriculum() {
  return (
    <Curriculum type="subschool" banner="/banners/school.png"></Curriculum>
  );
}
