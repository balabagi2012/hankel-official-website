import About from "@/components/About";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenAbout() {
  return (
    <main>
      <Banner size="small" src="/banners/kindergarten.png"></Banner>
      <About type="kindergarten"/>
    </main>
  );
}
