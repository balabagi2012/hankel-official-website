import Banner from "@/components/Banner";
import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolFacilities() {
  return (
    <main className="pt-[200px]">
      <Banner size="small" src="/banners/school.png"></Banner>
      <Facility />
    </main>
  );
}
