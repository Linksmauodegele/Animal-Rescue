"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type ContactSettings = {
  id?: string;
  email: string;
  phone: string;
  address: string;
  facebook_url: string;
  volunteer_email: string;
};

const DEFAULT: ContactSettings = {
  email: "info@linksmauodegele.lt",
  phone: "+370 658 90300",
  address: "Didlaukio g. 78-16, Vilnius",
  facebook_url: "https://www.facebook.com/linksmauodegele",
  volunteer_email: "info@linksmauodegele.lt",
};

const inputClass =
  "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
const labelClass =
  "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

export default function ContactsAdmin() {
  const [form, setForm] = useState<ContactSettings>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setFetching(true);
    const { data } = await supabase
      .from("contact_settings")
      .select("*")
      .limit(1)
      .single();
    if (data) setForm(data);
    setFetching(false);
  }

  async function handleSave() {
    setLoading(true);
    if (form.id) {
      const { error } = await supabase
        .from("contact_settings")
        .update(form)
        .eq("id", form.id);
      if (error) console.error("Contact update error:", error);
    } else {
      const { data, error } = await supabase
        .from("contact_settings")
        .insert(form)
        .select()
        .single();
      if (error) console.error("Contact insert error:", error);
      if (data) setForm((f) => ({ ...f, id: data.id }));
    }
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
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">
            ← Atgal
          </a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">
            📍 Kontaktai
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e8d8be] space-y-4 mb-6">
          <h2 className="font-semibold text-[#1e1a17] mb-2">Kontaktinė informacija</h2>
          <div>
            <label className={labelClass}>El. paštas</label>
            <input
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Telefonas</label>
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Registracijos adresas</label>
            <input
              className={inputClass}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Facebook nuoroda</label>
            <input
              className={inputClass}
              value={form.facebook_url}
              onChange={(e) =>
                setForm((f) => ({ ...f, facebook_url: e.target.value }))
              }
            />
          </div>
          <div>
            <label className={labelClass}>Savanorių el. paštas</label>
            <input
              className={inputClass}
              value={form.volunteer_email}
              onChange={(e) =>
                setForm((f) => ({ ...f, volunteer_email: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="bg-[#fff8f0] border border-[#f0d8b0] rounded-2xl p-4 mb-6 text-sm text-[#7a5c40]">
          💡 <strong className="text-[#1e1a17]">Pastaba:</strong> Čia išsaugoti duomenys rodomi kontaktų puslapyje.
          Norint pakeisti footer kontaktus — eikite į <a href="/admin/footer" className="text-[#c4622d] underline">Puslapio apačia</a>.
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-[#c4622d] text-white rounded-xl py-3 font-semibold hover:bg-[#a84e22] transition-colors disabled:opacity-50"
        >
          {loading ? "Saugoma..." : saved ? "✅ Išsaugota!" : "Išsaugoti pakeitimus"}
        </button>
      </div>
    </div>
  );
}
