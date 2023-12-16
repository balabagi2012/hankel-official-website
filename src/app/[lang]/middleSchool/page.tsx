import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchool({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Subschool lang={lang} name="middleSchool" />;
}
