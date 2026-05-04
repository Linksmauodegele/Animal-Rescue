"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageWrapper from "@/components/PageWrapper";

type S = { gpm_heading: string; gpm_description: string; gpm_code: string; gpm_facebook_video_url: string; gpm_note: string; };
const D: S = {
  gpm_heading: "Skirkite 1,2 % GPM",
  gpm_description: "Tai jums nieko nekainuoja — tik kelios minutės, o gyvūnams padeda labai daug.",
  gpm_code: "306212187",
  gpm_facebook_video_url: "https://www.facebook.com/reel/917493140868107",
  gpm_note: "Paraišką galite pateikti iki gegužės 1 d. už praėjusius metus. Tai absoliučiai nemokama — jūsų mokesčiai nuo to nepadidėja.",
};

const STEPS = [
  { step: "1", title: "Eikite į deklaravimas.vmi.lt", desc: "Apsilankykite deklaravimas.vmi.lt ir prisijunkite per el. bankininkystę arba el. parašą." },
  { step: "2", title: "Raskite FR0512 formą", desc: "Ieškokite prašymo skirti pajamų mokesčio dalį arba FR0512." },
  { step: "3", title: "Įveskite mūsų kodą", desc: "Gavėjo paieškoje įrašykite Linksma uodegele arba kodą 306212187." },
  { step: "4", title: "Patvirtinkite", desc: "Pateikite formą. Viskas — jūs padėjote gyvūnams nieko papildomai neišleidę!" },
];

export default function GpmPage() {
  const [s, setS] = useState<S>(D);
  useEffect(() => {
    supabase.from("parama_settings").select("*").limit(1).single()
      .then(({ data }) => { if (data) setS({ ...D, ...data }); });
  }, []);

  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-[#f5f0ea]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Be papildomų išlaidų</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
              <em className="italic text-[#c4622d]">{s.gpm_heading}</em>
            </h1>
            <p className="text-[#7a5c40] max-w-xl mx-auto text-lg">{s.gpm_description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d8be]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#c4622d]/10 flex items-center justify-center text-3xl">🐾</div>
                  <div>
                    <div className="font-display font-bold text-[#1e1a17] text-xl">Paramos gavėjo kodas</div>
                    <div className="text-[#c4622d] font-mono font-bold text-2xl">{s.gpm_code}</div>
                  </div>
                </div>
                <p className="text-[#7a5c40] text-sm leading-relaxed mb-6">
                  Prisijunkite prie <strong className="text-[#c4622d]">EDS sistemos</strong> ir užpildykite <strong>FR0512</strong> formą.
                  Gavėjo paieškos langelyje įrašykite <strong>VšĮ Linksma uodegėlė</strong> arba kodą <strong>{s.gpm_code}</strong>.
                </p>
                <a href="https://deklaravimas.vmi.lt" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary text-sm py-3 px-6 w-full justify-center">
                  Pildyti formą deklaravimas.vmi.lt →
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8d8be]">
                <h3 className="font-display font-bold text-[#1e1a17] text-lg mb-2">📹 Vaizdo instrukcija</h3>
                <p className="text-[#7a5c40] text-sm mb-4">Žiūrėkite žingsnis po žingsnio kaip užpildyti formą:</p>
                <a href={s.gpm_facebook_video_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-[#e8d8be] hover:border-[#c4622d] transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white text-xl flex-shrink-0">▶</div>
                  <div>
                    <div className="font-semibold text-[#1e1a17] text-sm group-hover:text-[#c4622d] transition-colors">Žiūrėti instrukciją Facebook</div>
                    <div className="text-xs text-[#7a5c40]">Kaip skirti 1,2% GPM per EDS</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-[#1e1a17] text-xl mb-6">Kaip tai padaryti?</h3>
              {STEPS.map(step => (
                <div key={step.step} className="flex gap-4 items-start bg-white rounded-2xl p-5 border border-[#e8d8be]">
                  <div className="w-9 h-9 rounded-full bg-[#c4622d] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{step.step}</div>
                  <div>
                    <div className="font-semibold text-[#1e1a17] text-sm mb-1">{step.title}</div>
                    <div className="text-[#7a5c40] text-sm">{step.desc}</div>
                  </div>
                </div>
              ))}
              <div className="bg-[#fff8f0] rounded-2xl p-5 border border-[#f0d8b0] mt-4">
                <p className="text-sm text-[#7a5c40]">💡 <strong className="text-[#1e1a17]">Pastaba:</strong> {s.gpm_note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
