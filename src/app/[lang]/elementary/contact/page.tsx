import Contact from "@/components/Contact";
import { getContact } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}): Promise<Metadata> {
  const data = await getContact("elementary");

  return {
    title: data?.seoTitle?.[lang] ?? "Hankel - Contact",
    description: data?.seoDescription?.[lang] ?? "Hankel - Contact",
    openGraph: {
      images: [data.banner.img],
    },
    robots: "index, follow",
  };
}

export default function ElementaryContact({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Contact lang={lang} name="elementary" type="subschool" />;
}
