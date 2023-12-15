import Facility from "@/components/Facility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenFacilities() {
  return <Facility type="kindergarten" banner="/banners/kindergarten.png" />;
}
