import Banner from "@/components/Banner";
import ContactSection from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

const title = "Contact Us";
const description = `Contact to Habkel`;

export default function HomeContact() {
  return (
    <main className="pt-[80px]">
      <Banner
        size="large"
        src="/banners/contact.png"
        title={title}
        description={description}
      ></Banner>
      <ContactSection />
    </main>
  );
}
