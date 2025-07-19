import Facility from "@/components/Facility";
import { getFacility } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getFacility("middleSchool");
  return {
    title: data?.seoTitle?.[lang] ?? "Hankel",
    description: data?.seoDescription?.[lang] ?? "Hankel",
    openGraph: {
      images: [`https://www.hiape.ntpc.edu.tw${data.banner}`],
    },
    robots: "index, follow",
  };
}

export default function MiddleSchoolFacilities({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Facility lang={lang} name="middleSchool" type="subschool" />;
}
