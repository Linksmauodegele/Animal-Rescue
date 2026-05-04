"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageWrapper from "@/components/PageWrapper";

type Group = { title: string; icon: string; items: string[] };
type S = { daiktai_heading: string; daiktai_description: string; daiktai_groups: Group[] };

const DEFAULT_GROUPS: Group[] = [
  { title: "Maistas ir vaistai", icon: "🍽️", items: ["Kokybiškas sausas ir šlapias ėdalas kačiukams ir suaugusioms katėms", "Gydomųjų linijų ėdalas: Specific Kidney Support, Monge Gastrointestinal", "Sriuba / gėrimas katėms (Miamor, Kattovit ir kt.)", "Virbac Nutri Plus vitamininė pasta", "Oxycid S – dezinfekcijai", "Akių lašai: Tobrin, Dexamethasone, Gentamicin", "Lašai nuo parazitų: Nexgard Combo, Selehold", "Tabletės nuo kirminų: Milprazon, Dehinel ir kt."] },
  { title: "Buities reikmenys", icon: "🧹", items: ["Kraikas sušokantis (mažyliams – Tofu kraikas)", "Kraiko dėžutės XL dydžio ir semtuvėliai", "Guminės ir vienkartinės pirštinės S ir M dydžių", "Popieriniai rankšluosčiai", "Šiukšlių maišai 30–60 litrų", "Drėgnos servetėlės", "Vienkartinės palutės / paklotai"] },
  { title: "Inventorius", icon: "🏠", items: ["Žaislai: kamuoliukai, pelytės, plunksnos ir pan.", "Dubenėliai", "Draskyklės", "Guoliai", "Transportavimo dėžės (boksai)", "Tekstilė: užvalkalai, paklodės, pledai"] },
  { title: "Kaip perduoti?", icon: "📦", items: ["📮 Atsiųsti į paštomatą: Didlaukio g. 80A, Vilnius", "🤝 Perduoti asmeniškai: Ateities g. 25B, Vilnius", "📞 Susisiekti tel. +370 658 90300"] },
];

const D: S = { daiktai_heading: "Parama daiktais", daiktai_description: "Jei nenorite pervesti pinigų, galite padovanoti reikalingus daiktus tiesiai mūsų globotiniams.", daiktai_groups: DEFAULT_GROUPS };

export default function DaiktaiPage() {
  const [s, setS] = useState<S>(D);
  useEffect(() => {
    supabase.from("parama_settings").select("*").limit(1).single().then(({ data }) => {
      if (data) setS({
        daiktai_heading: data.daiktai_heading ?? D.daiktai_heading,
        daiktai_description: data.daiktai_description ?? D.daiktai_description,
        daiktai_groups: typeof data.daiktai_groups === "string" ? JSON.parse(data.daiktai_groups) : (data.daiktai_groups ?? D.daiktai_groups),
      });
    });
  }, []);

  const lastGroup = s.daiktai_groups[s.daiktai_groups.length - 1];
  const mainGroups = s.daiktai_groups.slice(0, -1);

  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Reikalingi daiktai</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
              <em className="italic text-[#c4622d]">{s.daiktai_heading}</em>
            </h1>
            <p className="text-[#7a5c40] max-w-xl mx-auto">{s.daiktai_description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainGroups.map(group => (
              <div key={group.title} className="rounded-2xl p-6 border bg-[#f8f0e3] border-[#e8d8be]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{group.icon}</span>
                  <h2 className="font-display font-bold text-[#1e1a17] text-lg">{group.title}</h2>
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#5c3d1e] flex gap-2">
                      <span className="text-[#c4622d] flex-shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {lastGroup && (
              <div className="md:col-span-2 rounded-2xl p-6 border bg-[#c4622d]/5 border-[#c4622d]/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{lastGroup.icon}</span>
                  <h2 className="font-display font-bold text-[#1e1a17] text-lg">{lastGroup.title}</h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {lastGroup.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#5c3d1e] flex gap-2">
                      <span className="flex-shrink-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
