import NewsDetail from "@/components/NewsDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - News",
  robots: "index, follow",
};

export default async function NewsDetailPage({
  params: { id, lang },
}: {
  params: { id: string; lang: "en" | "zh" };
}) {
  return <NewsDetail id={id} lang={lang} />;
}
