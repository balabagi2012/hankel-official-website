import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - HighSchool",
  robots: "index, follow",
};

export default function MiddleSchoolFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility type="subschool" lang={lang} name="highSchool" />;
}
