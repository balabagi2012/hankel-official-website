import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolContact() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
    </main>
  );
}
