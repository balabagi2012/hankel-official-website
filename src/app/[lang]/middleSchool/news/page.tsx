import News from "@/components/News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - News",
  robots: "index, follow",
};

export default async function MiddleSchoolNews({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <News lang={lang} name={"middleSchool"} />;
}
