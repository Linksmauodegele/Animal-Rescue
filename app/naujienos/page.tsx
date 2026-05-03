import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import BlogSection from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Naujienos – Sėkmės istorijos ir įvykiai | Linksma Uodegėlė",
  description: "Naujienos, sėkmės istorijos ir informacija apie VšĮ Linksma Uodegėlė veiklą. Sekite mūsų gyvūnų prieglaudos gyvenimą Vilniuje.",
  openGraph: {
    title: "Naujienos – Linksma Uodegėlė",
    description: "Naujienos ir sėkmės istorijos iš gyvūnų prieglaudos Vilniuje.",
  },
};

export default function NaujienosPage() {
  return (
    <PageWrapper>
      <BlogSection fullPage />
    </PageWrapper>
  );
}
