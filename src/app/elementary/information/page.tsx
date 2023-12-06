import Banner from "@/components/Banner";
import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryInformation() {
  return (
    <main>
      <Banner size="small" src="/banners/school.png"></Banner>
      <Information />
    </main>
  );
}
