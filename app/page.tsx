import Hero from "@/components/hero/Hero";
import TrustStats from "@/components/sections/TrustStats";
import About from "@/components/sections/About";
import Treatments from "@/components/sections/Treatments";
import Doctors from "@/components/sections/Doctors";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Technology from "@/components/sections/Technology";
import FullWidthImage from "@/components/sections/FullWidthImage";
import PatientJourney from "@/components/sections/PatientJourney";
import Testimonials from "@/components/sections/Testimonials";
import Location from "@/components/sections/Location";
import AppointmentCTA from "@/components/sections/AppointmentCTA";

// The full scroll experience, in the brief's order:
// hero → trust → about → treatments → doctors → results → technology →
// statement → journey → testimonials → location → appointment.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStats />
      <About />
      <Treatments />
      <Doctors />
      <BeforeAfter />
      <Technology />
      <FullWidthImage />
      <PatientJourney />
      <Testimonials />
      <Location />
      <AppointmentCTA />
    </>
  );
}
