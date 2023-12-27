import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryTeam({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Team type="subschool" lang={lang} name="elementary" />;
}
