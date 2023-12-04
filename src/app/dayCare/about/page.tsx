import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareAbout() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
    </main>
  );
}
