import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareCurriculum() {
  return (
    <Curriculum type="subschool" banner="/banners/school.png"></Curriculum>
  );
}
