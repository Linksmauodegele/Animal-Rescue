import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Kontaktai",
  description: "Susisiekite su mumis. Rašykite, skambinkite arba užpildykite formą.",
};

export default function KontaktaiPage() {
  return (
    <PageWrapper>
      <ContactSection fullPage />
    </PageWrapper>
  );
}
