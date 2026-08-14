import type { Metadata } from "next";
import Doctors from "@/components/sections/Doctors";
import AppointmentCTA from "@/components/sections/AppointmentCTA";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Meet the specialists at Carewell — The Dental Experts, Vengara, across general dentistry, oral surgery, periodontics, orthodontics and endodontics.",
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  return (
    <div className="pt-24">
      <Doctors />
      <AppointmentCTA />
    </div>
  );
}
