import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryTeam() {
  return <Team type="subschool" banner="/banners/school.png" />;
}
