"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Remejas = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  display_order: number;
};

export default function RemejaiSection() {
  const [remejai, setRemejai] = useState<Remejas[]>([]);

  useEffect(() => {
    supabase.from("remejai").select("*").order("display_order").then(({ data }) => {
      if (data) setRemejai(data);
    });
  }, []);

  if (remejai.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-[#e8d8be]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="section-label mb-3">Jie prisideda</p>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#1e1a17]">
            Mūsų <em className="italic text-[#c4622d]">rėmėjai</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center">
          {remejai.map((r) => (
            <a
              key={r.id}
              href={r.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300"
              title={r.name}
            >
              <div className="h-14 px-5 flex items-center justify-center rounded-xl border border-[#e8d8be] bg-[#faf6f0] group-hover:border-[#c4622d]/30 group-hover:shadow-sm transition-all" style={{ minWidth: 110 }}>
                {r.logo_url ? (
                  <Image src={r.logo_url} alt={r.name} width={120} height={36} className="h-9 w-auto object-contain" />
                ) : (
                  <span className="font-bold text-sm text-[#3d2e1e] tracking-wide text-center">{r.name}</span>
                )}
              </div>
              {r.description && (
                <p className="text-xs text-[#7a5c40] text-center leading-tight max-w-[120px]">{r.description}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
