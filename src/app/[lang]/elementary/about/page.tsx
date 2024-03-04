import About from "@/components/About";
import { getAbout } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getAbout("elementary");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel - About",
    description: data?.seoDescription?.[lang] ?? "Hankel - About",
    openGraph: {
      images: [data.banner],
    },
    robots: "index, follow",
  };
}
export default function ElementaryAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="elementary" type="subschool" />;
}
