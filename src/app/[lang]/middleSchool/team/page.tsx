import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolTeam() {
  return <Team type="subschool" banner="/banners/school.png" />;
}
