"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type HeroContent = {
  id?: string;
  label: string;
  heading_line1: string;
  heading_highlight: string;
  heading_line3: string;
  description: string;
  btn_primary_text: string;
  btn_primary_href: string;
  btn_secondary_text: string;
  btn_secondary_href: string;
};

const DEFAULT: HeroContent = {
  label: "Gyvūnų prieglauda · Vilnius",
  heading_line1: "Kiekviena",
  heading_highlight: "uodegėlė",
  heading_line3: "verta namų",
  description: "Mes gelbstim sužeistus ir beglobiams likusius gyvūnus. Suteikiame veterinarinę pagalbą, laikiną globą ir ieškome jiems tikrų namų.",
  btn_primary_text: "🐾 Žiūrėti globotinius",
  btn_primary_href: "/gyvunai",
  btn_secondary_text: "♥ Prisidėti",
  btn_secondary_href: "/parama",
};

export default function HeroAdmin() {
  const [form, setForm] = useState<HeroContent>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("hero_content").select("*").limit(1).single();
      if (data) setForm(data);
      setFetching(false);
    }
    load();
  }, []);

  async function handleSave() {
    setLoading(true);
    if (form.id) {
      await supabase.from("hero_content").update(form).eq("id", form.id);
    } else {
      const { data } = await supabase.from("hero_content").insert(form).select().single();
      if (data) setForm((f) => ({ ...f, id: data.id }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setLoading(false);
  }

  const inputClass = "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
  const labelClass = "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

  if (fetching) return <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center"><p className="text-[#7a5c40]">Kraunama...</p></div>;

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🏠 Titulinis puslapis</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Antraštė</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Etiketė viršuje (mažas tekstas)</label>
                <input className={inputClass} value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Pirma eilutė</label>
                <input className={inputClass} value={form.heading_line1} onChange={e => setForm(f => ({ ...f, heading_line1: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Paryškintas žodis (raudonas, kursyvas)</label>
                <input className={inputClass} value={form.heading_highlight} onChange={e => setForm(f => ({ ...f, heading_highlight: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Trečia eilutė</label>
                <input className={inputClass} value={form.heading_line3} onChange={e => setForm(f => ({ ...f, heading_line3: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Aprašymas</label>
                <textarea className={inputClass} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Mygtukai</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Pagrindinis mygtukas tekstas</label>
                  <input className={inputClass} value={form.btn_primary_text} onChange={e => setForm(f => ({ ...f, btn_primary_text: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Pagrindinis mygtukas nuoroda</label>
                  <input className={inputClass} value={form.btn_primary_href} onChange={e => setForm(f => ({ ...f, btn_primary_href: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Antrinis mygtukas tekstas</label>
                  <input className={inputClass} value={form.btn_secondary_text} onChange={e => setForm(f => ({ ...f, btn_secondary_text: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Antrinis mygtukas nuoroda</label>
                  <input className={inputClass} value={form.btn_secondary_href} onChange={e => setForm(f => ({ ...f, btn_secondary_href: e.target.value }))} />
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} disabled={loading}
            className="w-full bg-[#c4622d] text-white rounded-xl py-3 font-semibold hover:bg-[#a84e22] transition-colors disabled:opacity-50">
            {loading ? "Saugoma..." : saved ? "✅ Išsaugota!" : "Išsaugoti pakeitimus"}
          </button>
        </div>
      </div>
    </div>
  );
}
