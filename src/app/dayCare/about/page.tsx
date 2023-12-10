import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareAbout() {
  return <About type="subschool" />;
}
