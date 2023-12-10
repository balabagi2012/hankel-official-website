import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryAbout() {
  return <About type="subschool" />;
}
