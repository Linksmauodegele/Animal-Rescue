"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────

type DaiktaiGroup = { title: string; icon: string; items: string[] };

type ParamaSettings = {
  id?: string;
  // Hub page
  hub_heading: string;
  hub_description: string;
  // Finansinė
  fin_heading: string;
  fin_description: string;
  fin_paypal_url: string;
  fin_contribee_url: string;
  fin_bank_name: string;
  fin_bank_code: string;
  fin_bank_iban: string;
  fin_bank_bank: string;
  // GPM
  gpm_heading: string;
  gpm_description: string;
  gpm_code: string;
  gpm_facebook_video_url: string;
  gpm_note: string;
  // Daiktai
  daiktai_heading: string;
  daiktai_description: string;
  daiktai_groups: DaiktaiGroup[];
  // Įsigyk
  isigyk_heading: string;
  isigyk_description: string;
  isigyk_phone: string;
};

const DEFAULT: ParamaSettings = {
  hub_heading: "Kaip galite padėti?",
  hub_description: "Mūsų veikla išlaikoma tik iš gerų žmonių aukų. Kiekviena pagalba – svarbi.",
  fin_heading: "Jūsų parama keičia gyvūnų likimus",
  fin_description: "Mūsų veikla išlaikoma tik iš gerų žmonių aukų. Kiekvienas euras paskiriamas tiesiai gyvūnų gydymui, globai ir priežiūrai.",
  fin_paypal_url: "https://www.paypal.com/donate/?hosted_button_id=YRY662EAYBHLC",
  fin_contribee_url: "https://contribee.com/linksma-uodegele",
  fin_bank_name: "VšĮ Linksma uodegėlė",
  fin_bank_code: "306212187",
  fin_bank_iban: "LT237044090104254458",
  fin_bank_bank: "SEB",
  gpm_heading: "Skirkite 1,2 % GPM",
  gpm_description: "Tai jums nieko nekainuoja — tik kelios minutės, o gyvūnams padeda labai daug.",
  gpm_code: "306212187",
  gpm_facebook_video_url: "https://www.facebook.com/reel/917493140868107",
  gpm_note: "Paraišką galite pateikti iki gegužės 1 d. už praėjusius metus. Tai absoliučiai nemokama — jūsų mokesčiai nuo to nepadidėja.",
  daiktai_heading: "Parama daiktais",
  daiktai_description: "Jei nenorite pervesti pinigų, galite padovanoti reikalingus daiktus tiesiai mūsų globotiniams.",
  daiktai_groups: [
    {
      title: "Maistas ir vaistai", icon: "🍽️",
      items: [
        "Kokybiškas sausas ir šlapias ėdalas kačiukams ir suaugusioms katėms (Acana, Orijen, Mac's, Leonardo, Grandorf)",
        "Gydomųjų linijų ėdalas: Specific Kidney Support, Monge Gastrointestinal, Specific hipoalerginis",
        "Sriuba / gėrimas katėms (Miamor, Kattovit ir kt.)",
        "Virbac Nutri Plus vitamininė pasta",
        "Oxycid S – dezinfekcijai",
        "Akių lašai: Tobrin, Dexamethasone, Gentamicin",
        "Lašai nuo parazitų: Nexgard Combo, Selehold",
        "Tabletės nuo kirminų: Milprazon, Dehinel ir kt.",
      ],
    },
    {
      title: "Buities reikmenys", icon: "🧹",
      items: [
        "Kraikas sušokantis (mažyliams – Tofu kraikas)",
        "Kraiko dėžutės XL dydžio ir semtuvėliai",
        "Guminės ir vienkartinės pirštinės S ir M dydžių",
        "Popieriniai rankšluosčiai",
        "Šiukšlių maišai 30–60 litrų",
        "Drėgnos servetėlės",
        "Vienkartinės palutės / paklotai",
      ],
    },
    {
      title: "Inventorius", icon: "🏠",
      items: ["Žaislai: kamuoliukai, pelytės, plunksnos ir pan.", "Dubenėliai", "Draskyklės", "Guoliai", "Transportavimo dėžės (boksai)", "Tekstilė: užvalkalai, paklodės, pledai"],
    },
    {
      title: "Kaip perduoti?", icon: "📦",
      items: ["📮 Atsiųsti į paštomatą: Didlaukio g. 80A, Vilnius", "🤝 Perduoti asmeniškai: Ateities g. 25B, Vilnius", "📞 Susisiekti tel. +370 658 90300"],
    },
  ],
  isigyk_heading: "Įsigyk sau – padėk gyvūnui",
  isigyk_description: "Mūsų sekėjos Anos rankų darbo mezginiai. Visos sukauptos lėšos skiriamos globotinių priežiūrai ir gydymui.",
  isigyk_phone: "+370 658 90300",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputClass = "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
const labelClass = "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
      <h2 className="font-semibold text-[#1e1a17] mb-5 text-base">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelClass}>{label}</label>{children}</div>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ParamaAdmin() {
  const [tab, setTab] = useState<"hub" | "finansine" | "gpm" | "daiktai" | "isigyk">("hub");
  const [form, setForm] = useState<ParamaSettings>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    setFetching(true);
    const { data, error: err } = await supabase.from("parama_settings").select("*").limit(1).single();
    if (err && err.code !== "PGRST116") setError(`Klaida kraunant: ${err.message}`);
    if (data) {
      setForm({
        ...DEFAULT,
        ...data,
        daiktai_groups: typeof data.daiktai_groups === "string"
          ? JSON.parse(data.daiktai_groups)
          : (data.daiktai_groups ?? DEFAULT.daiktai_groups),
      });
    }
    setFetching(false);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    let err;
    if (form.id) {
      ({ error: err } = await supabase.from("parama_settings").update(form).eq("id", form.id));
    } else {
      const { data, error: insertErr } = await supabase.from("parama_settings").insert(form).select().single();
      err = insertErr;
      if (data) setForm(f => ({ ...f, id: data.id }));
    }
    if (err) { setError(`Klaida išsaugant: ${err.message}`); setLoading(false); return; }
    await fetchSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setLoading(false);
  }

  function set(key: keyof ParamaSettings, value: any) {
    setForm(f => ({ ...f, [key]: value }));
  }

  // Daiktai group helpers
  function updateGroup(gi: number, field: keyof DaiktaiGroup, value: any) {
    const groups = form.daiktai_groups.map((g, i) => i === gi ? { ...g, [field]: value } : g);
    set("daiktai_groups", groups);
  }
  function updateItem(gi: number, ii: number, value: string) {
    const groups = form.daiktai_groups.map((g, i) => i === gi
      ? { ...g, items: g.items.map((item, j) => j === ii ? value : item) }
      : g);
    set("daiktai_groups", groups);
  }
  function addItem(gi: number) {
    const groups = form.daiktai_groups.map((g, i) => i === gi ? { ...g, items: [...g.items, ""] } : g);
    set("daiktai_groups", groups);
  }
  function removeItem(gi: number, ii: number) {
    const groups = form.daiktai_groups.map((g, i) => i === gi ? { ...g, items: g.items.filter((_, j) => j !== ii) } : g);
    set("daiktai_groups", groups);
  }
  function addGroup() {
    set("daiktai_groups", [...form.daiktai_groups, { title: "", icon: "📦", items: [""] }]);
  }
  function removeGroup(gi: number) {
    set("daiktai_groups", form.daiktai_groups.filter((_, i) => i !== gi));
  }

  const TABS = [
    { key: "hub", label: "🗂️ Pagrindinis" },
    { key: "finansine", label: "💳 Finansinė" },
    { key: "gpm", label: "📋 GPM" },
    { key: "daiktai", label: "📦 Daiktai" },
    { key: "isigyk", label: "🛍️ Įsigyk sau" },
  ] as const;

  if (fetching) return (
    <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center">
      <p className="text-[#7a5c40]">Kraunama...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">💰 Parama</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-[#c4622d] text-white"
                  : "bg-white border border-[#e8d8be] text-[#5c3d1e] hover:border-[#c4622d]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">

          {/* ── HUB ── */}
          {tab === "hub" && (
            <Card title="Pagrindinis parama puslapis">
              <Field label="Antraštė">
                <input className={inputClass} value={form.hub_heading} onChange={e => set("hub_heading", e.target.value)} />
              </Field>
              <Field label="Aprašymas">
                <textarea className={inputClass} rows={3} value={form.hub_description} onChange={e => set("hub_description", e.target.value)} />
              </Field>
            </Card>
          )}

          {/* ── FINANSINĖ ── */}
          {tab === "finansine" && (<>
            <Card title="Tekstas">
              <Field label="Antraštė">
                <input className={inputClass} value={form.fin_heading} onChange={e => set("fin_heading", e.target.value)} />
              </Field>
              <Field label="Aprašymas">
                <textarea className={inputClass} rows={3} value={form.fin_description} onChange={e => set("fin_description", e.target.value)} />
              </Field>
            </Card>
            <Card title="Mokėjimo būdai">
              <Field label="PayPal URL">
                <input className={inputClass} value={form.fin_paypal_url} onChange={e => set("fin_paypal_url", e.target.value)} />
              </Field>
              <Field label="Contribee URL">
                <input className={inputClass} value={form.fin_contribee_url} onChange={e => set("fin_contribee_url", e.target.value)} />
              </Field>
            </Card>
            <Card title="Banko pavedimas">
              <Field label="Gavėjo pavadinimas">
                <input className={inputClass} value={form.fin_bank_name} onChange={e => set("fin_bank_name", e.target.value)} />
              </Field>
              <Field label="Įmonės kodas">
                <input className={inputClass} value={form.fin_bank_code} onChange={e => set("fin_bank_code", e.target.value)} />
              </Field>
              <Field label="IBAN sąskaita">
                <input className={inputClass} value={form.fin_bank_iban} onChange={e => set("fin_bank_iban", e.target.value)} />
              </Field>
              <Field label="Bankas">
                <input className={inputClass} value={form.fin_bank_bank} onChange={e => set("fin_bank_bank", e.target.value)} />
              </Field>
            </Card>
          </>)}

          {/* ── GPM ── */}
          {tab === "gpm" && (<>
            <Card title="Tekstas">
              <Field label="Antraštė">
                <input className={inputClass} value={form.gpm_heading} onChange={e => set("gpm_heading", e.target.value)} />
              </Field>
              <Field label="Aprašymas">
                <textarea className={inputClass} rows={3} value={form.gpm_description} onChange={e => set("gpm_description", e.target.value)} />
              </Field>
              <Field label="Pastaba (apačioje)">
                <textarea className={inputClass} rows={3} value={form.gpm_note} onChange={e => set("gpm_note", e.target.value)} />
              </Field>
            </Card>
            <Card title="Paramos gavėjas">
              <Field label="Kodas (įmonės kodas)">
                <input className={inputClass} value={form.gpm_code} onChange={e => set("gpm_code", e.target.value)} />
              </Field>
              <Field label="Facebook video instrukcija URL">
                <input className={inputClass} value={form.gpm_facebook_video_url} onChange={e => set("gpm_facebook_video_url", e.target.value)} />
              </Field>
            </Card>
          </>)}

          {/* ── DAIKTAI ── */}
          {tab === "daiktai" && (<>
            <Card title="Antraštė">
              <Field label="Antraštė">
                <input className={inputClass} value={form.daiktai_heading} onChange={e => set("daiktai_heading", e.target.value)} />
              </Field>
              <Field label="Aprašymas">
                <textarea className={inputClass} rows={2} value={form.daiktai_description} onChange={e => set("daiktai_description", e.target.value)} />
              </Field>
            </Card>

            {form.daiktai_groups.map((group, gi) => (
              <div key={gi} className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2 flex-1">
                    <input className={`${inputClass} w-16`} value={group.icon} onChange={e => updateGroup(gi, "icon", e.target.value)} placeholder="🍽️" />
                    <input className={inputClass} value={group.title} onChange={e => updateGroup(gi, "title", e.target.value)} placeholder="Grupės pavadinimas" />
                  </div>
                  <button onClick={() => removeGroup(gi)} className="ml-3 text-red-400 hover:text-red-600 text-xl px-2">×</button>
                </div>
                <div className="space-y-2 mb-3">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex gap-2">
                      <input className={inputClass} value={item} onChange={e => updateItem(gi, ii, e.target.value)} placeholder="Prekė ar informacija..." />
                      <button onClick={() => removeItem(gi, ii)} className="text-red-400 hover:text-red-600 text-xl px-2 shrink-0">×</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem(gi)} className="text-sm text-[#c4622d] hover:underline">+ Pridėti eilutę</button>
              </div>
            ))}

            <button onClick={addGroup}
              className="w-full border-2 border-dashed border-[#e8d8be] rounded-2xl py-4 text-[#c4622d] font-semibold hover:border-[#c4622d] transition-colors text-sm">
              + Pridėti grupę
            </button>
          </>)}

          {/* ── ĮSIGYK ── */}
          {tab === "isigyk" && (
            <Card title="Įsigyk sau puslapis">
              <Field label="Antraštė">
                <input className={inputClass} value={form.isigyk_heading} onChange={e => set("isigyk_heading", e.target.value)} />
              </Field>
              <Field label="Aprašymas">
                <textarea className={inputClass} rows={3} value={form.isigyk_description} onChange={e => set("isigyk_description", e.target.value)} />
              </Field>
              <Field label="Telefono numeris užsakymams">
                <input className={inputClass} value={form.isigyk_phone} onChange={e => set("isigyk_phone", e.target.value)} />
              </Field>
              <div className="bg-[#fff8f0] border border-[#f0d8b0] rounded-xl p-4 text-sm text-[#7a5c40]">
                💡 Produktus (nuotraukas, kainas, aprašymus) valdykite skyriuje{" "}
                <a href="/admin/isigyk" className="text-[#c4622d] underline">Įsigyk sau → Produktai</a>.
              </div>
            </Card>
          )}

          {/* Save button */}
          <button onClick={handleSave} disabled={loading}
            className="w-full bg-[#c4622d] text-white rounded-xl py-3 font-semibold hover:bg-[#a84e22] transition-colors disabled:opacity-50">
            {loading ? "Saugoma..." : saved ? "✅ Išsaugota!" : "Išsaugoti pakeitimus"}
          </button>
        </div>
      </div>
    </div>
  );
}
