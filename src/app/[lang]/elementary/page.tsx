import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
  robots: "index, follow",
};

export default function Elementary({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Subschool lang={lang} name="elementary" />;
}
