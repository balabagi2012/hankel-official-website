import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenContact() {
  return (
    <main>
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <Contact type="kindergarten" />
    </main>
  );
}
