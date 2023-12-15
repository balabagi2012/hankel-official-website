import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

const title = "Contact Us";
const description = `Contact to Habkel`;

export default function HomeContact() {
  return <Contact type="home" title={title} description={description} />;
}
