import Information from "@/components/Information";
import { getInformation } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getInformation("afterSchool");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel - Contact",
    description: data?.seoDescription?.[lang] ?? "Hankel - Contact",
    openGraph: {
      images: [data.banner],
    },
    robots: "index, follow",
  };
}

export default function AfterSchoolInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="subschool" lang={lang} name="afterSchool" />;
}
