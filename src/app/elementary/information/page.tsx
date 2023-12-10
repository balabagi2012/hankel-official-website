import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryInformation() {
  return <Information type="subschool" banner="/banners/school.png" />;
}
