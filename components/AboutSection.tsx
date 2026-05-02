"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type AboutContent = {
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
  value1_title: string;
  value1_desc: string;
  value2_title: string;
  value2_desc: string;
  value3_title: string;
  value3_desc: string;
  image_url?: string;
};

const DEFAULT: AboutContent = {
  heading: "Mes esame jų balsas, kai jie neturi kito",
  subheading: "Apie mus",
  paragraph1: "VšĮ „Linksma uodegėlė\" – tai nevyriausybinė organizacija, kuri jau kelerius metus keičia nuskriaustų gyvūnų likimus Vilniuje ir aplinkinėse vietovėse.",
  paragraph2: "Mes neturime savo prieglaudos patalpų — kiekvienas mūsų globotinis gyvena savanorių šeimoje, kur gauna meilę, priežiūrą ir šilumą, kol suras tikrus namus.",
  value1_title: "Laikina globa",
  value1_desc: "Visi globotiniai gyvena savanorių namų globose, ne narveliuose",
  value2_title: "Pilnas gydymas",
  value2_desc: "Kiekvienas gyvūnas gauna veterinarinę pagalbą ir visus skiepus",
  value3_title: "Atsakingas įvaikinimas",
  value3_desc: "Rūpestingai tikriname būsimus šeimininkus",
};

export default function AboutSection({ fullPage = false }: { fullPage?: boolean }) {
  const [content, setContent] = useState<AboutContent>(DEFAULT);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("about_content").select("*").limit(1).single();
      if (data) setContent(data as AboutContent);
    }
    load();
  }, []);

  return (
    <section
      id="apie"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8f0e3 0%, #fde8cc 100%)" }}
    >
      {/* Decorative blob */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10" aria-hidden="true">
        <svg viewBox="0 0 500 500">
          <path
            d="M250,50 C380,20 460,120 470,250 C480,380 390,460 260,470 C130,480 40,390 30,260 C20,130 120,80 250,50Z"
            fill="#c4622d"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: image */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #f0d8b0, #e8c99a)" }}
            >
              {content.image_url ? (
                <img
                  src={content.image_url}
                  alt="Apie mus"
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="h-80 flex items-center justify-center text-[#c4622d]/30">
                  <svg viewBox="0 0 80 80" className="w-20 h-20" fill="currentColor">
                    <path d="M40 10 C55 10 65 20 65 35 C65 50 55 60 40 60 C25 60 15 50 15 35 C15 20 25 10 40 10Z" />
                  </svg>
                </div>
              )}
              {/* Floating badge */}
              <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-lg p-4 text-center">
                <div className="font-display text-3xl font-bold text-[#c4622d]">💛</div>
                <div className="text-xs text-[#7a5c40] font-medium">Išgelbėti gyvūnai</div>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="section-label mb-4">{content.subheading}</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-6 leading-snug">
              {content.heading.split(",")[0]},
              <br />
              <em className="italic text-[#c4622d]">{content.heading.split(",")[1]?.trim()}</em>
            </h2>
            <p className="text-[#5c3d1e] leading-relaxed mb-4">{content.paragraph1}</p>
            <p className="text-[#7a5c40] leading-relaxed mb-6">{content.paragraph2}</p>

            <div className="space-y-4 mb-8">
              {[
                { title: content.value1_title, desc: content.value1_desc },
                { title: content.value2_title, desc: content.value2_desc },
                { title: content.value3_title, desc: content.value3_desc },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#c4622d] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5,5 L4,7.5 L8.5,2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1e1a17] text-sm mb-0.5">{item.title}</div>
                    <div className="text-sm text-[#7a5c40]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="/kontaktai" className="btn-primary">
              Susisiekti su mumis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
