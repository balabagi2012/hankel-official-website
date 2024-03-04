import { AboutEntity } from "@/app/api/about/route";
import About from "@/components/About";
import type { Metadata } from "next";

async function getAbout(name: string, lang: "en" | "zh"): Promise<AboutEntity> {
  const res = await fetch(
    `${process.env.API_URI}/api/about/${name}?lang=${lang}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const about = await getAbout("home", lang);

  return {
    title: about?.seoTitle?.[lang] ?? "Hankel - About",
    description: about?.seoDescription?.[lang] ?? "Hankel - About",
    openGraph: {
      images: [about.banner],
    },
    robots: "index, follow",
  };
}

export default function HomeAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="home" type="home" />;
}
