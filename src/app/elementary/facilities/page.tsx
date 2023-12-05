import Banner from "@/components/Banner";
import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryFacilities() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <Facility />
    </main>
  );
}
