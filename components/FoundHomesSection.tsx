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

function AnimalCard({ a }: { a: Animal }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border-2 border-[#e8d8be] hover:border-[#c4622d] transition-all hover:shadow-lg hover:-translate-y-1 bg-white"
      >
        <div className="w-full aspect-square bg-[#f0e6d0] overflow-hidden flex items-center justify-center text-6xl">
          {a.image_url ? (
            <img src={a.image_url} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            "🐾"
          )}
        </div>
        <div className="p-3 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[#1e1a17] text-base leading-tight">{a.name}</span>
            <span className="text-[#c4622d] text-lg">🏠</span>
          </div>
          {a.description && (
            <p className="text-xs text-[#7a5c40] line-clamp-2 leading-relaxed">{a.description}</p>
          )}
          {a.adopted_at && (
            <p className="text-[10px] text-[#b0946a] mt-1">
              {new Date(a.adopted_at).toLocaleDateString("lt-LT", { year: "numeric", month: "long" })}
            </p>
          )}
          {a.description && (
            <span className="text-[10px] text-[#c4622d] font-semibold mt-1">Skaityti daugiau →</span>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(30,26,23,0.7)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {a.image_url && (
              <div className="w-full h-64 overflow-hidden">
                <img src={a.image_url} alt={a.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-2xl font-bold text-[#1e1a17]">{a.name} 🏠</h3>
                <button onClick={() => setOpen(false)} className="text-[#7a5c40] hover:text-[#1e1a17] text-2xl leading-none">×</button>
              </div>
              {a.adopted_at && (
                <p className="text-sm text-[#b0946a] mb-3">
                  Rado namus: {new Date(a.adopted_at).toLocaleDateString("lt-LT", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
              {a.description && (
                <p className="text-[#5c3d1e] leading-relaxed">{a.description}</p>
              )}
              <button
                onClick={() => setOpen(false)}
                className="mt-6 w-full py-3 rounded-xl bg-[#c4622d] text-white font-semibold hover:bg-[#a84e22] transition-colors"
              >
                Uždaryti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
      <div className="max-w-6xl mx-auto px-6">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border-2 border-[#e8d8be]">
                <div className="w-full aspect-square bg-[#f0e6d0] animate-pulse" />
                <div className="p-3">
                  <div className="h-4 w-20 bg-[#f0e6d0] rounded animate-pulse mb-2" />
                  <div className="h-3 w-full bg-[#f0e6d0] rounded animate-pulse" />
                </div>
              </div>
            ))
          ) : animals.length === 0 ? (
            <p className="col-span-full text-[#7a5c40] py-8 text-center">Kol kas istorijų nėra — bet jos netrukus atsiras!</p>
          ) : (
            animals.map((a) => <AnimalCard key={a.id} a={a} />)
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
