import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenAbout() {
  return <About name="kindergarten" type="kindergarten" />;
}
