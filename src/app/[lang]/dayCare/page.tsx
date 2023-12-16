import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCare({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Subschool lang={lang} name="dayCare" />;
}
