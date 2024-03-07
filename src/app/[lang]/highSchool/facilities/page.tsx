import Facility from "@/components/Facility";
import { getFacility } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getFacility("highSchool");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel",
    description: data?.seoDescription?.[lang] ?? "Hankel",
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw/${data.banner}`],
    },
    robots: "index, follow",
  };
}

export default function HighSchoolFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility type="subschool" lang={lang} name="highSchool" />;
}
