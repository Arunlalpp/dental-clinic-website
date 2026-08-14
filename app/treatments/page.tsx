import type { Metadata } from "next";
import Treatments from "@/components/sections/Treatments";
import Technology from "@/components/sections/Technology";
import AppointmentCTA from "@/components/sections/AppointmentCTA";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Explore treatments at Carewell — The Dental Experts, Vengara: root canal, dental implants, orthodontics, cosmetic dentistry, veneers, dentures, aligners and more.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <div className="pt-24">
      <Treatments />
      <Technology />
      <AppointmentCTA />
    </div>
  );
}
