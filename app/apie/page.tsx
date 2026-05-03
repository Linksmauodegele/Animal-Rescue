import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "Apie mus – VšĮ Linksma Uodegėlė | Gyvūnų prieglauda Vilniuje nuo 2018",
  description: "Sužinokite daugiau apie VšĮ Linksma Uodegėlė – nevyriausybinę gyvūnų prieglaudą Vilniuje. Mūsų misija, vertybės ir komanda nuo 2018 metų.",
  openGraph: {
    title: "Apie mus – VšĮ Linksma Uodegėlė",
    description: "Nevyriausybinė gyvūnų prieglauda Vilniuje nuo 2018 metų. Mūsų misija, vertybės ir komanda.",
  },
};

export default function ApiePage() {
  return (
    <PageWrapper>
      <AboutSection fullPage />
    </PageWrapper>
  );
}
