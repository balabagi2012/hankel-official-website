import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
  robots: "index, follow",
};

export default function ElementaryTeam({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Team type="subschool" lang={lang} name="elementary" />;
}
