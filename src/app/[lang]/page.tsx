import HomePage from "@/components/HomePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel",
  robots: "index, follow",
};

export default function Home({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <HomePage lang={lang} name="home"></HomePage>;
}
