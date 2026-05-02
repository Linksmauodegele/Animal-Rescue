"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Animal = {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: string;
  breed: string;
  status: string;
  description: string;
  tags: string[];
  image_url: string;
  gallery_images: string[];
  birthday: string;
  shelter_since: string;
};

const TYPE_EMOJI: Record<string, string> = { dog: "🐕", cat: "🐈", other: "🐾" };
const TYPE_COLORS: Record<string, string> = { dog: "#fde8cc", cat: "#d4e8d0", other: "#f0d8b0" };

function calcAge(birthday: string): string {
  if (!birthday) return "";
  const birth = new Date(birthday);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;
  if (totalMonths < 12) return `${totalMonths} mėn.`;
  return years === 1 ? "1 metai" : `${years} metai`;
}

function calcShelterYears(shelterSince: string): string {
  if (!shelterSince) return "";
  const since = new Date(shelterSince);
  const now = new Date();
  const months = (now.getFullYear() - since.getFullYear()) * 12 + (now.getMonth() - since.getMonth());
  if (months < 1) return "Ką tik atvyko";
  if (months < 12) return `${months} mėn.`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 metai" : `${years} metai`;
}

export default function AnimalsSection({ fullPage }: { fullPage?: boolean }) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filter, setFilter] = useState<"all" | "dog" | "cat">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimals() {
      const { data } = await supabase.from("animals").select("*").order("created_at", { ascending: false });
      if (data) setAnimals(data);
      setLoading(false);
    }
    fetchAnimals();
  }, []);

  const filtered = filter === "all" ? animals : animals.filter(a => a.type === filter);

  return (
    <section id="globotiniai" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute paw-trail" style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 30}%`, opacity: 0.04 }}>
            <svg width="30" height="30" viewBox="0 0 40 40" fill="#c4622d">
              <ellipse cx="20" cy="28" rx="10" ry="8" />
              <ellipse cx="10" cy="18" rx="5" ry="6" />
              <ellipse cx="30" cy="18" rx="5" ry="6" />
              <ellipse cx="15" cy="10" rx="4" ry="5" />
              <ellipse cx="25" cy="10" rx="4" ry="5" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Mūsų globotiniai</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
            Jie laukia <em className="italic text-[#c4622d]">tavęs</em>
          </h2>
          <p className="text-[#7a5c40] max-w-xl mx-auto">
            Kiekvienas iš jų turi savo istoriją. Galbūt būtent tu tinkamas žmogus, kurio jie laukia.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {[
              { val: "all" as const, label: "🐾 Visi" },
              { val: "dog" as const, label: "🐕 Šunys" },
              { val: "cat" as const, label: "🐈 Katės" },
            ].map(f => (
              <button key={f.val} onClick={() => setFilter(f.val)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === f.val ? "bg-[#c4622d] text-white shadow-md" : "bg-[#f8f0e3] text-[#5c3d1e] hover:bg-[#f0e6d0]"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#7a5c40]">Kraunama...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#7a5c40]">Šiuo metu nėra globotinių. Užsukite vėliau!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((animal, i) => {
              const ageStr = animal.birthday ? calcAge(animal.birthday) : animal.age;
              const shelterStr = calcShelterYears(animal.shelter_since);
              return (
                <article key={animal.id} className="animal-card card-hover group opacity-0 animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                  <div className="h-52 flex items-center justify-center relative overflow-hidden"
                    style={{ background: TYPE_COLORS[animal.type] || "#f0d8b0" }}>
                    {animal.image_url ? (
                      <img src={animal.image_url} className="w-full h-full object-cover" alt={animal.name} />
                    ) : (
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {TYPE_EMOJI[animal.type] || "🐾"}
                      </span>
                    )}
                    <div className="badge">{animal.status}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-[#1e1a17] mb-1">{animal.name}</h3>
                    <div className="flex flex-col gap-1 mb-4 text-sm text-[#7a5c40]">
                      {ageStr && (
                        <div className="flex items-center gap-1.5">
                          <span>🎂</span>
                          <span><strong className="text-[#5c3d1e]">Amžius:</strong> {ageStr}</span>
                        </div>
                      )}
                      {shelterStr && (
                        <div className="flex items-center gap-1.5">
                          <span>🏠</span>
                          <span><strong className="text-[#5c3d1e]">Prieglaudoje:</strong> {shelterStr}</span>
                        </div>
                      )}
                    </div>
                    <a href={`/gyvunai/${animal.id}/adoptuoti`} className="w-full btn-primary justify-center py-2.5 text-sm flex">Sužinoti daugiau</a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-[#7a5c40] mb-4">Norite susisiekti dėl globotinių?</p>
          <a href="/kontaktai" className="btn-outline">Susisiekite su mumis</a>
        </div>
      </div>
    </section>
  );
}
