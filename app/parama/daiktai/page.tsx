import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Parama daiktais – Linksma uodegėlė",
  description: "Paaukokite reikalingus daiktus – maistą, vaistus, buities reikmenis mūsų globotiniams.",
};

export default function DaiktaiPage() {
  const groups = [
    {
      title: "Maistas ir vaistai",
      icon: "🍽️",
      items: [
        "Kokybiškas sausas ir šlapias ėdalas kačiukams ir suaugusioms katėms (Acana, Orijen, Mac's, Leonardo, Grandorf)",
        "Gydomųjų linijų ėdalas: Specific Kidney Support, Monge Gastrointestinal, Specific hipoalerginis",
        "Sriuba / gėrimas katėms (Miamor, Kattovit ir kt.)",
        "Virbac Nutri Plus vitamininė pasta",
        "DaForte maisto papildas katėms",
        "Oxycid S – dezinfekcijai",
        "Akių lašai: Tobrin, Dexamethasone, Gentamicin",
        "Lašai nuo parazitų: Nexgard Combo, Selehold",
        "Tabletės nuo kirminų: Milprazon, Dehinel ir kt.",
      ],
    },
    {
      title: "Buities reikmenys",
      icon: "🧹",
      items: [
        "Kraikas sušokantis (mažyliams – Tofu kraikas)",
        "Kraiko dėžutės XL dydžio ir semtuvėliai",
        "Guminės ir vienkartinės pirštinės S ir M dydžių",
        "Popieriniai rankšluosčiai",
        "Šiukšlių maišai 30–60 litrų",
        "Drėgnos servetėlės",
        "Vienkartinės palutės / paklotai",
        "Šluotos, semtuvėliai, šluotelės",
      ],
    },
    {
      title: "Inventorius",
      icon: "🏠",
      items: [
        "Žaislai: kamuoliukai, pelytės, plunksnos ir pan.",
        "Dubenėliai",
        "Draskyklės",
        "Guoliai",
        "Transportavimo dėžės (boksai)",
        "Tekstilė: užvalkalai, paklodės, pledai",
      ],
    },
    {
      title: "Kaip perduoti?",
      icon: "📦",
      items: [
        "📮 Atsiųsti į paštomatą: Didlaukio g. 80A, Vilnius",
        "🤝 Perduoti asmeniškai: Ateities g. 25B, Vilnius",
        "📞 Susisiekti tel. +370 658 90300",
      ],
      highlight: true,
    },
  ];

  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Reikalingi daiktai</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
              Parama <em className="italic text-[#c4622d]">daiktais</em>
            </h1>
            <p className="text-[#7a5c40] max-w-xl mx-auto">
              Jei nenorite pervesti pinigų, galite padovanoti reikalingus daiktus tiesiai mūsų globotiniams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div
                key={group.title}
                className={`rounded-2xl p-6 border ${
                  group.highlight
                    ? "bg-[#c4622d]/5 border-[#c4622d]/20"
                    : "bg-[#f8f0e3] border-[#e8d8be]"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{group.icon}</span>
                  <h2 className="font-display font-bold text-[#1e1a17] text-lg">{group.title}</h2>
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-[#5c3d1e] flex gap-2">
                      <span className="text-[#c4622d] flex-shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
