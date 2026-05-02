import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBanner from "./FloatingBanner";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FloatingBanner />
      <Navbar />
      <main id="main-content" className="pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
