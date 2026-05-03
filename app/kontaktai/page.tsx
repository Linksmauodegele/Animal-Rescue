import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Kontaktai – Susisiekite | Linksma Uodegėlė Vilnius",
  description: "Susisiekite su VšĮ Linksma Uodegėlė. Rašykite, skambinkite arba užpildykite formą. Atsakome kuo greičiau.",
  openGraph: {
    title: "Kontaktai – Linksma Uodegėlė",
    description: "Susisiekite su gyvūnų prieglauda Vilniuje. Atsakome kuo greičiau.",
  },
};

export default function KontaktaiPage() {
  return (
    <PageWrapper>
      <ContactSection fullPage />
    </PageWrapper>
  );
}
