import Banner from "@/components/Banner";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenTeam() {
  return (
    <main>
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <Team type="kindergarten" />
    </main>
  );
}
