"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Partner = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
};

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    supabase.from("partners").select("*").order("display_order").then(({ data }) => {
      if (data) setPartners(data);
    });
  }, []);

  if (partners.length === 0) return null;

  return (
    <section className="py-16 bg-[#faf6f0] border-y border-[#e8d8be]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[#7a5c40] text-xs font-semibold uppercase tracking-[0.2em] mb-10">
          Mūsų partneriai
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center">
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300"
              aria-label={p.name}
              title={p.name}
            >
              <div className="h-12 px-5 flex items-center justify-center rounded-lg border border-[#e8d8be] bg-white group-hover:border-[#c4622d]/30 group-hover:shadow-sm transition-all" style={{ minWidth: 100 }}>
                {p.logo_url ? (
                  <Image src={p.logo_url} alt={p.name} width={120} height={32} className="h-8 w-auto object-contain" />
                ) : (
                  <span className="font-bold text-sm text-[#3d2e1e] tracking-wide">{p.name}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
