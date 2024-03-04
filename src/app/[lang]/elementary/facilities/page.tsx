import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
  robots: "index, follow",
};

export default function ElementaryFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility type="subschool" lang={lang} name="elementary" />;
}
