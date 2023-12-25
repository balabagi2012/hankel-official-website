import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

export default function HomeContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name="home" type="home" />;
}
