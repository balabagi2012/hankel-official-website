import Banner from "@/components/Banner";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolTeam() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <Team />
    </main>
  );
}
