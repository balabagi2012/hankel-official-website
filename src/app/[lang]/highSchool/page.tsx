import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function HighSchool({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Subschool lang={lang} name="highSchool" />;
}
