import type { Metadata } from "next";
import About from "@/components/sections/About";
import TrustStats from "@/components/sections/TrustStats";
import PatientJourney from "@/components/sections/PatientJourney";
import AppointmentCTA from "@/components/sections/AppointmentCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Carewell — The Dental Experts is a patient-focused dental clinic in Vengara with specialists across endodontics, orthodontics, periodontics, implantology and oral surgery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <TrustStats />
      <PatientJourney />
      <AppointmentCTA />
    </div>
  );
}
