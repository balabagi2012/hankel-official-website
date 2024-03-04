import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
  robots: "index, follow",
};

export default function KindergartenTeam({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Team type="kindergarten" lang={lang} name="kindergarten" />;
}
