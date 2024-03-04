import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function MiddleSchoolAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="highSchool" type="subschool" />;
}
