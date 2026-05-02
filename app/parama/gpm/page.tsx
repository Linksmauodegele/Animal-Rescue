import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Skirkite 1,2% GPM – Linksma uodegėlė",
  description: "Skirkite 1,2% gyventojų pajamų mokesčio VšĮ Linksma uodegėlė. Tai nieko nekainuoja!",
};

export default function GpmPage() {
  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-[#f5f0ea]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Be papildomų išlaidų</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
              Skirkite <em className="italic text-[#c4622d]">1,2&nbsp;%</em> GPM
            </h1>
            <p className="text-[#7a5c40] max-w-xl mx-auto text-lg">
              Tai jums nieko nekainuoja — tik kelios minutės, o gyvūnams padeda labai daug.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d8be]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#c4622d]/10 flex items-center justify-center text-3xl">🐾</div>
                <div>
                  <div className="font-display font-bold text-[#1e1a17] text-xl">Paramos gavėjo kodas</div>
                  <div className="text-[#c4622d] font-mono font-bold text-2xl">306212187</div>
                </div>
              </div>
              <div className="font-display font-bold text-[#1e1a17] text-lg mb-2">VšĮ Linksma uodegėlė</div>
              <p className="text-[#7a5c40] text-sm leading-relaxed">
                Užpildykite <strong className="text-[#c4622d]">FR0512</strong> formą ir gavėjo paieškos langelyje įrašykite VšĮ „Linksma uodegėlė" arba identifikacinį numerį – <strong>306212187</strong>.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: "1", title: "Prisijunkite prie VMI", desc: "Eikite į vmi.lt ir prisijunkite prie savitarnos sistemos." },
                { step: "2", title: "Raskite FR0512 formą", desc: "Gyventojo pajamų mokesčio permokos (dalies) grąžinimo prašymas." },
                { step: "3", title: "Įveskite mūsų kodą", desc: "Gavėjo paieškoje įrašykite Linksma uodegėlė arba kodą 306212187." },
                { step: "4", title: "Patvirtinkite", desc: "Pateikite formą. Viskas – jūs padėjote gyvūnams!" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#c4622d] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1e1a17] text-sm">{s.title}</div>
                    <div className="text-[#7a5c40] text-sm">{s.desc}</div>
                  </div>
                </div>
              ))}
              <a
                href="https://www.vmi.lt/evmi/gyventojams/pajamu-mokescio-deklaravimas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-primary text-sm py-3 px-6"
              >
                Pildyti VMI formą →
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
