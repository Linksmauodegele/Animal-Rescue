"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type FooterData = {
  id?: string;
  phone: string;
  email: string;
  address_post: string;
  address_personal: string;
  facebook_url: string;
  company_code: string;
  description: string;
  nav_links: { href: string; label: string }[];
};

const DEFAULT: FooterData = {
  phone: "+370 658 90300",
  email: "info@linksmauodegele.lt",
  address_post: "Didlaukio g. 80A, Vilnius",
  address_personal: "Ateities g. 25B, Vilnius",
  facebook_url: "https://www.facebook.com/linksmauodegele",
  company_code: "306212187",
  description:
    "Nevyriausybinė organizacija, kuri nuo 2018 m. keičia nuskriaustų gyvūnų likimus Vilniuje.",
  nav_links: [
    { href: "/gyvunai", label: "Globotiniai" },
    { href: "/apie", label: "Apie mus" },
    { href: "/parama", label: "Paremti" },
    { href: "/parama#daiktai", label: "Parama daiktais" },
    { href: "/parama#isigyk", label: "Įsigyk sau" },
    { href: "/naujienos", label: "Naujienos" },
    { href: "/kontaktai", label: "Kontaktai" },
  ],
};

export default function FooterAdmin() {
  const [form, setForm] = useState<FooterData>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchFooter();
  }, []);

  async function fetchFooter() {
    setFetching(true);
    const { data } = await supabase
      .from("footer_settings")
      .select("*")
      .limit(1)
      .single();
    if (data) {
      setForm({
        ...data,
        nav_links:
          typeof data.nav_links === "string"
            ? JSON.parse(data.nav_links)
            : data.nav_links,
      });
    }
    setFetching(false);
  }

  async function handleSave() {
    setLoading(true);
    const payload = { ...form };
    if (form.id) {
      await supabase
        .from("footer_settings")
        .update(payload)
        .eq("id", form.id);
    } else {
      const { data } = await supabase
        .from("footer_settings")
        .insert(payload)
        .select()
        .single();
      if (data) setForm((f) => ({ ...f, id: data.id }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setLoading(false);
  }

  function updateNavLink(index: number, field: "href" | "label", value: string) {
    const updated = [...form.nav_links];
    updated[index] = { ...updated[index], [field]: value };
    setForm((f) => ({ ...f, nav_links: updated }));
  }

  function addNavLink() {
    setForm((f) => ({
      ...f,
      nav_links: [...f.nav_links, { href: "", label: "" }],
    }));
  }

  function removeNavLink(index: number) {
    setForm((f) => ({
      ...f,
      nav_links: f.nav_links.filter((_, i) => i !== index),
    }));
  }

  const inputClass =
    "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
  const labelClass = "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center">
        <p className="text-[#7a5c40]">Kraunama...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">
            ← Atgal
          </a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">
            🦶 Puslapio apačia (Footer)
          </h1>
        </div>

        <div className="space-y-6">
          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Aprašymas</h2>
            <div>
              <label className={labelClass}>Aprašymas</label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">Kontaktai</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Telefonas</label>
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>El. paštas</label>
                <input
                  className={inputClass}
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Paštomato adresas</label>
                <input
                  className={inputClass}
                  value={form.address_post}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_post: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Perduoti asmeniškai adresas</label>
                <input
                  className={inputClass}
                  value={form.address_personal}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      address_personal: e.target.value,
                    }))
                  }
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
                <label className={labelClass}>Įmonės kodas</label>
                <input
                  className={inputClass}
                  value={form.company_code}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company_code: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be]">
            <h2 className="font-semibold text-[#1e1a17] mb-4">
              Navigacijos nuorodos
            </h2>
            <div className="space-y-3">
              {form.nav_links.map((link, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    className={inputClass}
                    placeholder="Pavadinimas"
                    value={link.label}
                    onChange={(e) => updateNavLink(i, "label", e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="/nuoroda"
                    value={link.href}
                    onChange={(e) => updateNavLink(i, "href", e.target.value)}
                  />
                  <button
                    onClick={() => removeNavLink(i)}
                    className="text-red-400 hover:text-red-600 text-lg px-2 shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addNavLink}
                className="text-sm text-[#c4622d] hover:underline mt-2"
              >
                + Pridėti nuorodą
              </button>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#c4622d] text-white rounded-xl py-3 font-semibold hover:bg-[#a84e22] transition-colors disabled:opacity-50"
          >
            {loading ? "Saugoma..." : saved ? "✅ Išsaugota!" : "Išsaugoti pakeitimus"}
          </button>
        </div>
      </div>
    </div>
  );
}
