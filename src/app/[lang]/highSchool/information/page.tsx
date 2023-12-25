import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
};

export default function MiddleSchoolInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="subschool" lang={lang} name="highSchool" />;
}
