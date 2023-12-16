import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility type="subschool" lang={lang} name="dayCare" />;
}
