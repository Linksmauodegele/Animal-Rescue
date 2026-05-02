import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import AnimalsSection from "@/components/AnimalsSection";

export const metadata: Metadata = {
  title: "Globotiniai",
  description: "Visi mūsų globojami gyvūnai, kurie ieško namų. Katės, šunys ir kiti gyvūnai.",
};

export default function GyvunaiPage() {
  return (
    <PageWrapper>
      <AnimalsSection fullPage />
    </PageWrapper>
  );
}
