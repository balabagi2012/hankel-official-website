import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareInformation() {
  return <Information type="subschool" banner="/banners/school.png" />;
}
