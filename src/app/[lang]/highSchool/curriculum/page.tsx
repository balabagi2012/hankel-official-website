import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function MiddleSchoolCurriculum({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return (
    <Curriculum lang={lang} name="highSchool" type="subschool"></Curriculum>
  );
}
