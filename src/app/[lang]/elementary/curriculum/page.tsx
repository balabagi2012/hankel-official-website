import Curriculum from "@/components/Curriculum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryCurriculum({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return (
    <Curriculum
      lang={lang}
      name="elementary"
      type="subschool"
    ></Curriculum>
  );
}
