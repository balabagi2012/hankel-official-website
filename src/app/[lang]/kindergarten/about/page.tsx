import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
  robots: "index, follow",
};

export default function KindergartenAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="kindergarten" type="kindergarten" />;
}
