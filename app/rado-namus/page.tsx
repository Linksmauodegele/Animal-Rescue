import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import FoundHomesSection from "@/components/FoundHomesSection";

export const metadata: Metadata = {
  title: "Rado namus",
  description: "Gyvūnai, kurie jau surado savo mylinčias šeimas.",
};

export default function RadoNamusPage() {
  return (
    <PageWrapper>
      <FoundHomesSection fullPage />
    </PageWrapper>
  );
}
