import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
  robots: "index, follow",
};

export default function ElementaryInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="subschool" lang={lang} name="elementary" />;
}
