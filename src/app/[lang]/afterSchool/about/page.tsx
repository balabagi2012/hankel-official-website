import About from "@/components/About";
import { getAbout } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getAbout("afterSchool");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel",
    description: data?.seoDescription?.[lang] ?? "Hankel",
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw/${data.banner}`],
    },
    robots: "index, follow",
  };
}

export default function AfterSchoolAbout({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <About lang={lang} name="afterSchool" type="subschool" />;
}
