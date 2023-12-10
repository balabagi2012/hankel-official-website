import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryContact() {
  return <Contact type="subschool" />;
}
