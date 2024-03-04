import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
  robots: "index, follow",
};

export default function KindergartenContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name={"kindergarten"} type="kindergarten" />;
}
