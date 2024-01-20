import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Half-Day School",
};

export default function AfterSchoolAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="afterSchool" type="subschool" />;
}
