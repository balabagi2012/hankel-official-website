import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolCurriculum() {
  return (
    <Curriculum type="subschool" banner="/banners/school.png"></Curriculum>
  );
}
