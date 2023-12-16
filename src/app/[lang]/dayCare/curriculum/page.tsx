import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareCurriculum({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return (
    <Curriculum
      lang={lang}
      name="dayCare"
      type="subschool"
    ></Curriculum>
  );
}
