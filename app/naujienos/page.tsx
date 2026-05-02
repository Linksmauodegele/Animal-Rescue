import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import BlogSection from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Naujienos",
  description: "Naujienos, sėkmės istorijos ir informacija apie mūsų veiklą.",
};

export default function NaujienosPage() {
  return (
    <PageWrapper>
      <BlogSection fullPage />
    </PageWrapper>
  );
}
