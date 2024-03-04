import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - After School",
  robots: "index, follow",
};

export default function AfterSchool({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Subschool lang={lang} name="afterSchool" />;
}
