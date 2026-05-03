import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import AnimalsSection from "@/components/AnimalsSection";

export const metadata: Metadata = {
  title: "Globotiniai – Šunys ir katės ieško namų | Linksma Uodegėlė Vilnius",
  description: "Visi mūsų globojami gyvūnai, kurie ieško mylinčių namų Vilniuje. Įsivaikink šunį ar katę – duok jiems antrą šansą.",
  openGraph: {
    title: "Globotiniai – Šunys ir katės ieško namų",
    description: "Įsivaikink šunį ar katę Vilniuje – duok jiems antrą šansą.",
  },
};

export default function GyvunaiPage() {
  return (
    <PageWrapper>
      <AnimalsSection fullPage />
    </PageWrapper>
  );
}
