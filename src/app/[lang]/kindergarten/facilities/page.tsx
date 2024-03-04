import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
  robots: "index, follow",
};

export default function KindergartenFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility type="kindergarten" lang={lang} name="kindergarten" />;
}
