import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parama – Linksma uodegėlė",
  description: "Paremkite mūsų veiklą finansiškai, daiktais arba skirkite 1,2% GPM.",
};

const SUPPORT_OPTIONS = [
  {
    href: "/parama/finansine",
    icon: "💳",
    label: "Finansinė parama",
    desc: "Perveskite auką per PayPal, Contribee arba bankiniu pavedimu.",
    bg: "linear-gradient(135deg, #2d5a27 0%, #1e3d1a 100%)",
    textColor: "text-white",
    descColor: "text-[#b5ccaa]",
  },
  {
    href: "/parama/gpm",
    icon: "📋",
    label: "Skirkite 1,2% GPM",
    desc: "Tai nieko nekainuoja – tik kelios minutės VMI svetainėje.",
    bg: "linear-gradient(135deg, #f5f0ea 0%, #e8d8be 100%)",
    textColor: "text-[#1e1a17]",
    descColor: "text-[#7a5c40]",
  },
  {
    href: "/parama/daiktai",
    icon: "📦",
    label: "Parama daiktais",
    desc: "Maistas, vaistai, buities reikmenys – tiesiai mūsų globotiniams.",
    bg: "linear-gradient(135deg, #fff8f0 0%, #fde8cc 100%)",
    textColor: "text-[#1e1a17]",
    descColor: "text-[#7a5c40]",
  },
  {
    href: "/parama/isigyk",
    icon: "🛍️",
    label: "Įsigyk sau – padėk gyvūnui",
    desc: "Rankų darbo mezginiai – visos lėšos skiriamos gyvūnams.",
    bg: "linear-gradient(135deg, #f0e6d0 0%, #e8d0ae 100%)",
    textColor: "text-[#1e1a17]",
    descColor: "text-[#7a5c40]",
  },
];

export default function ParamaPage() {
  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-[#f8f0e3]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Prisidėkite</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#1e1a17] mb-5 leading-snug">
              Kaip galite <em className="italic text-[#c4622d]">padėti</em>?
            </h1>
            <p className="text-[#7a5c40] max-w-xl mx-auto text-lg">
              Mūsų veikla išlaikoma tik iš gerų žmonių aukų. Kiekviena pagalba – svarbi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SUPPORT_OPTIONS.map((opt) => (
              <Link
                key={opt.href}
                href={opt.href}
                className="group rounded-3xl p-8 border border-[#e8d8be] hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-4"
                style={{ background: opt.bg }}
              >
                <div className="text-4xl">{opt.icon}</div>
                <div>
                  <div className={`font-display font-bold text-xl mb-2 group-hover:underline underline-offset-4 ${opt.textColor}`}>
                    {opt.label}
                  </div>
                  <div className={`text-sm leading-relaxed ${opt.descColor}`}>{opt.desc}</div>
                </div>
                <div className={`mt-auto text-sm font-semibold ${opt.textColor} opacity-70 group-hover:opacity-100 transition-opacity`}>
                  Sužinoti daugiau →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
