import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryFacilities() {
  return <Facility type="subschool" banner="/banners/school.png" />;
}
