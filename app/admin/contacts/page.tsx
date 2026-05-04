"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type ContactSettings = {
  id?: string;
  email: string;
  phone: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  volunteer_email: string;
  description: string;
};

const DEFAULT: ContactSettings = {
  email: "info@linksmauodegele.lt",
  phone: "+370 658 90300",
  address: "Didlaukio g. 78-16, Vilnius",
  facebook_url: "https://www.facebook.com/linksmauodegele",
  instagram_url: "https://www.instagram.com/linksma.uodegele",
  tiktok_url: "https://www.tiktok.com/@vsi.linksmauodegele",
  volunteer_email: "info@linksmauodegele.lt",
  description: "Norite tapti laikinu globėju ar tiesiog paklausti — rašykite! Atsakysime kuo greičiau.",
};

const inputClass = "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
const labelClass = "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

export default function ContactsAdmin() {
  const [form, setForm] = useState<ContactSettings>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    setFetching(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("contact_settings").select("*").limit(1).single();
    if (err && err.code !== "PGRST116") setError(`Klaida kraunant: ${err.message}`);
    if (data) setForm({ ...DEFAULT, ...data });
    setFetching(false);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    let err;
    if (form.id) {
      ({ error: err } = await supabase.from("contact_settings").update(form).eq("id", form.id));
    } else {
      const { data, error: insertErr } = await supabase.from("contact_settings").insert(form).select().single();
      err = insertErr;
      if (data) setForm((f) => ({ ...f, id: data.id }));
    }
    if (err) { setError(`Klaida išsaugant: ${err.message}`); setLoading(false); return; }
    await fetchSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setLoading(false);
  }

  if (fetching)
    return (
      <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center">
        <p className="text-[#7a5c40]">Kraunama...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">📍 Kontaktai</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Antraštės tekstas</h2>
            <label className={labelClass}>Aprašymas po antrašte</label>
            <textarea className={inputClass} rows={3} value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Kontaktinė informacija</h2>
            <div className="space-y-4">
              {[
                { key: "email", label: "El. paštas" },
                { key: "phone", label: "Telefonas" },
                { key: "address", label: "Registracijos adresas" },
                { key: "volunteer_email", label: "Savanorių el. paštas" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input className={inputClass} value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Socialiniai tinklai</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>📘 Facebook URL</label>
                <input className={inputClass} value={form.facebook_url}
                  onChange={(e) => setForm((f) => ({ ...f, facebook_url: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>📸 Instagram URL</label>
                <input className={inputClass} value={form.instagram_url}
                  onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>🎵 TikTok URL</label>
                <input className={inputClass} value={form.tiktok_url}
                  onChange={(e) => setForm((f) => ({ ...f, tiktok_url: e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="bg-[#fff8f0] border border-[#f0d8b0] rounded-2xl p-4 text-sm text-[#7a5c40]">
            💡 <strong className="text-[#1e1a17]">Pastaba:</strong> Footer kontaktus keiskite{" "}
            <a href="/admin/footer" className="text-[#c4622d] underline">Puslapio apačioje</a>.
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
