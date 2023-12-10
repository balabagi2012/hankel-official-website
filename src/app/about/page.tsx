import About from "@/components/About";
import Banner from "@/components/Banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - About",
};

const title = "About Us";
const description = `Finding Inspiration in Every Turn`;

export default function HomeAbout() {
  return (
    <About
      type="home"
      title={title}
      description={description}
      banner="/banners/about.png"
    />
  );
}
