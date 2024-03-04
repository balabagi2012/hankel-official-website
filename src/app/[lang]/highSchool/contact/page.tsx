import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function MiddleSchoolContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name="highSchool" type="subschool" />;
}
