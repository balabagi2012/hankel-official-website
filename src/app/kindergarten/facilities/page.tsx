import Banner from "@/components/Banner";
import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenFacilities() {
  return (
    <main className="pt-[200px]">
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <Facility type="kindergarten" />
    </main>
  );
}
