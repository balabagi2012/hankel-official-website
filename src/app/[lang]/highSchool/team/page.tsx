import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function MiddleSchoolTeam({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Team type="subschool" lang={lang} name="highSchool" />;
}
