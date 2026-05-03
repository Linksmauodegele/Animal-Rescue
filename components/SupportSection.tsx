export default function SupportSection() {
  return (
    <>
      {/* ── Financial Support ── */}
      <section
        id="finansine"
        className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #2d5a27 0%, #1e3d1a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
            <path d="M-100,300 Q200,100 500,300 Q800,500 1100,200 Q1300,100 1540,300 L1540,600 L-100,600Z" fill="white" />
          </svg>
        </div>
        <div className="absolute top-12 left-12 opacity-10 text-white text-4xl">🐾</div>
        <div className="absolute bottom-12 right-12 opacity-10 text-white text-4xl">🐾</div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <p className="section-label mb-4" style={{ color: "#8aab7a" }}>Prisidėkite</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white mb-6 leading-snug">
            Jūsų parama keičia
            <br />
            <em className="italic text-[#c9973a]">gyvūnų likimus</em>
          </h2>
          <p className="text-[#b5ccaa] max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            Mūsų veikla išlaikoma <strong className="text-white">tik iš gerų žmonių aukų</strong>. Kiekvienas euras paskiriamas tiesiai gyvūnų gydymui, globai ir priežiūrai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { label: "Veterinarija", icon: "💊", desc: "Gydymas ir skiepai" },
              { label: "Maistas ir priežiūra", icon: "🍖", desc: "Kasdienė globa" },
              { label: "Laikina globa", icon: "🏠", desc: "Savanorių šeimos" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white border border-white/10">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold text-white mb-1">{item.label}</div>
                <div className="text-sm text-[#b5ccaa]">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="#paypal-url-here"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-[#1e1a17] transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#FFD700" }}
              rel="noopener noreferrer"
              aria-label="Paremti per PayPal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#003087">
                <path d="M7.144 19.532l1.049-6.615H5.049L6.993 1.5h7.905c2.31 0 3.894.815 4.543 2.394.39.955.474 1.876.263 2.882-.028.136-.059.273-.094.41l-.006.018v.496l1.033.582.004.003a4.1 4.1 0 011.046 1.056c.41.576.658 1.268.658 2.103 0 .71-.13 1.384-.408 1.98-.275.593-.672 1.105-1.171 1.53-.88.75-1.966 1.118-3.208 1.118h-.777l-.65 4.1H12.18l.644-4.1H10.06l-.643 4.1H7.144z"/>
              </svg>
              PayPal parama
            </a>
            <a
              href="#contribee-url-here"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#c4622d" }}
              rel="noopener noreferrer"
              aria-label="Paremti per Contribee"
            >
              ♥ Contribee parama
            </a>
          </div>

          {/* Bank transfer */}
          <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto">
            <p className="text-[#8aab7a] text-sm font-semibold uppercase tracking-wider mb-3">Bankiniu pavedimu</p>
            <p className="text-white font-semibold">VšĮ Linksma uodegėlė</p>
            <p className="text-[#b5ccaa] text-sm mt-1">Įmonės kodas: <span className="text-white font-mono">306212187</span></p>
            <p className="text-[#b5ccaa] text-sm mt-1">Atsiskaitomoji sąskaita:</p>
            <p className="text-[#c9973a] font-mono text-base mt-1 font-bold tracking-wide">LT237044090104254458</p>
            <p className="text-[#8aab7a] text-xs mt-1">(SEB)</p>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#8aab7a]">
              Paskirtis: <span className="text-white font-semibold">Auka</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1,2% GPM ── */}
      <section
        id="gpm"
        className="py-20 bg-[#f5f0ea]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Be papildomų išlaidų</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
              Skirkite <em className="italic text-[#c4622d]">1,2&nbsp;%</em> GPM
            </h2>
            <p className="text-[#7a5c40] max-w-xl mx-auto text-lg">
              Tai jums nieko nekainuoja — tik kelios minutės, o gyvūnams padeda labai daug.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Info */}
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
                Užpildykite <strong className="text-[#c4622d]">FR0512</strong> formą ir gavėjo paieškos langelyje įrašykite VšĮ „Linksma uodegėlė“ arba identifikacinį numerį – <strong>306212187</strong>.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {[
                { step: "1", title: "Apsilankykite deklaravimas.vmi.lt", desc: "Prisijunkite per el. bankininkystę arba el. parašą." },
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
                href="https://deklaravimas.vmi.lt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-primary text-sm py-3 px-6"
              >
                Pildyti formą deklaravimas.vmi.lt →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parama daiktais ── */}
      <section
        id="daiktai"
        className="py-20 bg-white"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Reikalingi daiktai</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
              Parama <em className="italic text-[#c4622d]">daiktais</em>
            </h2>
            <p className="text-[#7a5c40] max-w-xl mx-auto">
              Jei nenorite pervesti pinigų, galite padovanoti reikalingus daiktus tiesiai mūsų globotiniams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
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
            ].map((group) => (
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
                  <h3 className="font-display font-bold text-[#1e1a17] text-lg">{group.title}</h3>
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

      {/* ── Įsigyk sau – padėk gyvūnui ── */}
      <section
        id="isigyk"
        className="py-20 bg-[#f5f0ea]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Rankų darbas</p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
              Įsigyk sau –{" "}
              <em className="italic text-[#c4622d]">padėk gyvūnui</em>
            </h2>
            <p className="text-[#7a5c40] max-w-2xl mx-auto">
              Mūsų sekėjos Anos rankų darbo mezginiai. Visos sukauptos lėšos skiriamos globotinių priežiūrai ir gydymui.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Rankinė ant peties",
                price: "40€",
                desc: "Rankų darbo nerta rankinė ant peties. Plotis 38 cm, ilgis su rankenomis 70 cm.",
                emoji: "👜",
                color: "#fde8cc",
              },
              {
                title: "Rankinė ant peties",
                price: "40€",
                desc: "Antrasis modelis – tamsesnių tonų. Plotis 38 cm, ilgis su rankenomis 70 cm.",
                emoji: "👜",
                color: "#d4e8f0",
              },
              {
                title: "Rankinė su ažūru",
                price: "30€",
                desc: "Lengva ažūrinė rankinė vasarai. Plotis 38 cm, ilgis su rankenomis 70 cm.",
                emoji: "🧺",
                color: "#d4f0e0",
              },
              {
                title: "Kojinės",
                price: "15€",
                desc: "Šiltos rankų darbo kojinės. Dydis 44–46.",
                emoji: "🧦",
                color: "#e8e0f8",
              },
              {
                title: "Kojinės",
                price: "15€",
                desc: "Šiltos rankų darbo kojinės. Dydis 40–42.",
                emoji: "🧦",
                color: "#f0e8d4",
              },
              {
                title: "Staltiesė",
                price: "40€",
                desc: "Nerta staltiesė. Skersmuo – 80 cm.",
                emoji: "🪡",
                color: "#f8e8d0",
              },
            ].map((product) => (
              <div
                key={product.title + product.price + product.desc}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8d8be] hover:shadow-md transition-shadow"
              >
                <div
                  className="h-40 flex items-center justify-center text-6xl"
                  style={{ background: product.color }}
                >
                  {product.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-[#1e1a17]">{product.title}</h3>
                    <span className="text-[#c4622d] font-bold text-lg ml-2 flex-shrink-0">{product.price}</span>
                  </div>
                  <p className="text-sm text-[#7a5c40]">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm">
            <div className="text-center mb-6">
              <p className="text-[#1e1a17] font-semibold text-lg">Norint įsigyti – skambinkite tel.</p>
              <a
                href="tel:+37065890300"
                className="text-[#c4622d] font-bold text-2xl hover:text-[#a84d20] transition-colors"
              >
                +370 658 90300
              </a>
              <p className="text-[#7a5c40] mt-1">arba užpildykite užklausą</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">Vardas</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d]"
                  placeholder="Jūsų vardas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">El. paštas *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d]"
                  placeholder="jusu@pastas.lt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">Žinutė *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d] resize-none"
                  placeholder="Kurį produktą norėtumėte įsigyti?"
                />
              </div>
              <button
                type="button"
                className="w-full btn-primary justify-center py-3"
              >
                Parašykite mums
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
