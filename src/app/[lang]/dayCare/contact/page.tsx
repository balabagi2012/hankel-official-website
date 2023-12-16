import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name="dayCare" type="subschool" />;
}
