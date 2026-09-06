import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BharatProject from "@/components/BharatProject";
import Editorial from "@/components/Editorial";
import FundingScore from "@/components/FundingScore";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <BharatProject />
        <Editorial />
        <FundingScore />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
