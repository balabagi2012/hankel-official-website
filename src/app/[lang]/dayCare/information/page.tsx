import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="subschool" lang={lang} name="dayCare" />;
}
