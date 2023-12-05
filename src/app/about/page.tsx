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
    <main>
      <Banner
        size="large"
        src="/banners/about.png"
        title={title}
        description={description}
      ></Banner>
      <About />
    </main>
  );
}
