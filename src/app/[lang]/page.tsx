import HomePage from "@/components/HomePage";
import { getHome } from "@/utils/api";

import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getHome();
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel",
    description: data?.seoDescription?.[lang] ?? "Hankel",
    openGraph: {
      images: [data.banner.img],
    },
    robots: "index, follow",
  };
}

export default function Home({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <HomePage lang={lang} name="home"></HomePage>;
}
