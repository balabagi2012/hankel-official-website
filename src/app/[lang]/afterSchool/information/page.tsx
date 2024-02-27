import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - After School",
};

export default function AfterSchoolInformation({
  params: { lang },
}: {
  params: { lang: "en" | "zh" };
}) {
  return <Information type="subschool" lang={lang} name="afterSchool" />;
}
