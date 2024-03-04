import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
  robots: "index, follow",
};

export default function KindergartenInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="kindergarten" lang={lang} name="kindergarten" />;
}
