import Banner from "@/components/Banner";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareTeam() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <Team />
    </main>
  );
}
