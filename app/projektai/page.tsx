import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import ProjectsSection from "@/components/ProjectsSection";

export const metadata: Metadata = {
  title: "Projektai – Linksma Uodegėlė",
  description: "VšĮ Linksma Uodegėlė vykdomi projektai ir iniciatyvos gyvūnų labui.",
};

export default function ProjektaiPage() {
  return (
    <PageWrapper>
      <ProjectsSection fullPage />
    </PageWrapper>
  );
}
