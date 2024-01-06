import News from "@/components/News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - News",
};

export default async function HalfDaySchoolNews({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <News lang={lang} name={"halfDaySchool"} />;
}
