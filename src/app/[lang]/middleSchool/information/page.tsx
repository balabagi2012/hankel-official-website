import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolInformation() {
  return <Information type="subschool" banner="/banners/school.png" />;
}
