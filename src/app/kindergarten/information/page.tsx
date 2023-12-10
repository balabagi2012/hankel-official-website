import Information from "@/components/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenInformation() {
  return <Information type="kindergarten" banner="/banners/kindergarten.png" />;
}
