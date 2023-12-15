import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - About",
};

export default function HomeAbout() {
  return <About name="home" type="home" />;
}
