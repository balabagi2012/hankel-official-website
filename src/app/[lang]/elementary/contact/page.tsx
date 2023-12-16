import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name="elementary" type="subschool" />;
}
