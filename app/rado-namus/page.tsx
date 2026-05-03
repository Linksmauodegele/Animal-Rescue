import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import FoundHomesSection from "@/components/FoundHomesSection";

export const metadata: Metadata = {
  title: "Rado namus – Sėkmės istorijos | Linksma Uodegėlė",
  description: "Gyvūnai, kurie jau surado mylinčias šeimas. Sėkmės istorijos iš VšĮ Linksma Uodegėlė gyvūnų prieglaudos Vilniuje.",
  openGraph: {
    title: "Rado namus – Sėkmės istorijos",
    description: "Gyvūnai, kurie jau surado mylinčias šeimas Vilniuje.",
  },
};

export default function RadoNamusPage() {
  return (
    <PageWrapper>
      <FoundHomesSection fullPage />
    </PageWrapper>
  );
}
