import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "Apie mus",
  description: "Sužinokite daugiau apie VšĮ Linksma uodegėlė – mūsų misiją, vertybes ir komandą.",
};

export default function ApiePage() {
  return (
    <PageWrapper>
      <AboutSection fullPage />
    </PageWrapper>
  );
}
