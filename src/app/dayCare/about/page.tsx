import About from "@/components/About";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareAbout() {
  return (
    <main className="pt-[200px]">
      <Banner size="small" src="/banners/school.png"></Banner>
      <About />
    </main>
  );
}
