import Information from "@/components/Information";
import { getInformation } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getInformation("kindergarten");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel",
    description: data?.seoDescription?.[lang] ?? "Hankel",
    openGraph: {
      images: [data.banner],
    },
    robots: "index, follow",
  };
}

export default function KindergartenInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="kindergarten" lang={lang} name="kindergarten" />;
}
