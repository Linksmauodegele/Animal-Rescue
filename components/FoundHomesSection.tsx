"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Animal = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  adopted_at?: string;
};

export default function FoundHomesSection({ fullPage = false }: { fullPage?: boolean }) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      const { data } = await supabase
        .from("rado_namus")
        .select("*")
        .order("adopted_at", { ascending: false });
      if (data) setAnimals(data);
      setLoading(false);
    }
    fetchAnimals();
  }, []);

  return (
    <section id="rado-namus" className={`bg-[#fdf8f2] ${fullPage ? "py-16" : "py-20"}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Sėkmės istorijos</p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
            Jie rado{" "}
            <em className="italic text-[#c4622d]">namus</em>
          </h2>
          <p className="text-[#7a5c40] max-w-xl mx-auto">
            Kiekvienas iš šių gyvūnų rado mylinčią šeimą. Ir tai įvyko dėl gerų žmonių.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-2xl bg-[#f0e6d0] animate-pulse border-2 border-[#e8d8be]" />
                <div className="h-3 w-14 bg-[#f0e6d0] rounded animate-pulse" />
              </div>
            ))
          ) : animals.length === 0 ? (
            <p className="text-[#7a5c40] py-8">Kol kas istorijų nėra — bet jos netrukus atsiras!</p>
          ) : (
            animals.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-2 group w-24">
                <div className="w-24 h-24 rounded-2xl bg-[#f0e6d0] overflow-hidden flex items-center justify-center text-4xl border-2 border-[#e8d8be] group-hover:border-[#c4622d] transition-colors">
                  {a.image_url ? (
                    <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    "🐱"
                  )}
                </div>
                <span className="text-xs font-semibold text-[#5c3d1e] text-center leading-tight">{a.name}</span>
                {a.description && (
                  <span className="text-xs text-[#7a5c40] text-center leading-tight line-clamp-2">{a.description}</span>
                )}
              </div>
            ))
          )}
        </div>

        {!fullPage && (
          <div className="text-center">
            <a href="/rado-namus" className="btn-outline">
              Žiūrėti visas istorijas →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
