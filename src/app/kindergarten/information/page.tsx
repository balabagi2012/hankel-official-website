import Banner from "@/components/Banner";
import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenInformation() {
  return (
    <main>
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <Information type="kindergarten" />
    </main>
  );
}
