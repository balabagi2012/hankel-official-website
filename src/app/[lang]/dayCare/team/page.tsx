import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareTeam() {
  return <Team type="subschool" banner="/banners/school.png" />;
}
