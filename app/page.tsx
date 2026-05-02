import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnimalsSection from "@/components/AnimalsSection";
import BlogSection from "@/components/BlogSection";
import PartnersSection from "@/components/PartnersSection";
import RemejaiSection from "@/components/RemejaiSection";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

export default function Home() {
  return (
    <>
      <FloatingBanner />
      <Navbar />
      <main id="main-content">
        <HeroBanner />
        <AnimalsSection />
        <BlogSection />
        <RemejaiSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
