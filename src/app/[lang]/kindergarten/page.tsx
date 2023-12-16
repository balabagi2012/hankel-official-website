import Subschool from "@/components/Subschool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function Kindergarten({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return (
    <Subschool
      lang={lang}
      name="kindergarten"
      banner="/banners/kindergarten.png"
      type="kindergarten"
    />
  );
}
