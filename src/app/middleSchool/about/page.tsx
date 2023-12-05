import About from "@/components/About";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolAbout() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <About />
    </main>
  );
}
