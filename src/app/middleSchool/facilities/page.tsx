import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolFacilities() {
  return <Facility type="subschool" banner="/banners/school.png" />;
}
