"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Partner = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
};

const EMPTY: Omit<Partner, "id"> = { name: "", logo_url: "", website_url: "", display_order: 0 };

export default function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [form, setForm] = useState<Omit<Partner, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchPartners(); }, []);

  async function fetchPartners() {
    const { data } = await supabase.from("partners").select("*").order("display_order");
    if (data) setPartners(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `partners/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setForm(f => ({ ...f, logo_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave() {
    setLoading(true);
    const payload = { ...form, display_order: form.display_order || partners.length };
    if (editId) {
      await supabase.from("partners").update(payload).eq("id", editId);
    } else {
      await supabase.from("partners").insert(payload);
    }
    await fetchPartners();
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar tikrai norite ištrinti?")) return;
    await supabase.from("partners").delete().eq("id", id);
    await fetchPartners();
  }

  async function moveUp(i: number) {
    if (i === 0) return;
    const a = partners[i], b = partners[i - 1];
    await supabase.from("partners").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("partners").update({ display_order: a.display_order }).eq("id", b.id);
    await fetchPartners();
  }

  async function moveDown(i: number) {
    if (i === partners.length - 1) return;
    const a = partners[i], b = partners[i + 1];
    await supabase.from("partners").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("partners").update({ display_order: a.display_order }).eq("id", b.id);
    await fetchPartners();
  }

  function startEdit(p: Partner) {
    const { id, ...rest } = p;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🤝 Partneriai</h1>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors">
            + Pridėti
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-6">{editId ? "Redaguoti partnerį" : "Naujas partneris"}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Pavadinimas</label>
                <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Logotipas</label>
                <div className="flex gap-2">
                  <input className="input flex-1" value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="URL arba įkelkite" />
                  <button onClick={() => fileRef.current?.click()} className="px-3 py-2 bg-[#f8f0e3] border border-[#e8d8be] rounded-xl text-sm">
                    {uploading ? "⏳" : "📁"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
                {form.logo_url && <img src={form.logo_url} className="mt-2 h-16 object-contain" />}
              </div>
              <div>
                <label className="label">Svetainės nuoroda</label>
                <input className="input" value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={loading || !form.name}
                className="px-6 py-2.5 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] disabled:opacity-50">
                {loading ? "Saugoma..." : "💾 Išsaugoti"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-[#e8d8be] rounded-xl text-sm text-[#5c3d1e] hover:bg-[#f8f0e3]">
                Atšaukti
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {partners.length === 0 ? (
            <div className="text-center py-16 text-[#7a5c40] bg-white rounded-3xl border border-[#e8d8be]">Nėra partnerių. Pridėkite pirmąjį!</div>
          ) : partners.map((p, i) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#e8d8be] p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="text-xs text-[#7a5c40] hover:text-[#c4622d] disabled:opacity-30">▲</button>
                <button onClick={() => moveDown(i)} disabled={i === partners.length - 1} className="text-xs text-[#7a5c40] hover:text-[#c4622d] disabled:opacity-30">▼</button>
              </div>
              {p.logo_url ? (
                <img src={p.logo_url} className="h-12 w-20 object-contain" />
              ) : (
                <div className="h-12 w-20 bg-[#f8f0e3] rounded-xl flex items-center justify-center text-2xl">🤝</div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-[#1e1a17]">{p.name}</p>
                {p.website_url && <a href={p.website_url} target="_blank" className="text-xs text-[#c4622d] hover:underline">{p.website_url}</a>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(p)} className="text-[#c4622d] hover:underline text-xs font-medium">Redaguoti</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline text-xs font-medium">Ištrinti</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .label { display: block; font-size: 0.75rem; font-weight: 600; color: #5c3d1e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.375rem; }
        .input { width: 100%; padding: 0.625rem 1rem; border-radius: 0.75rem; border: 1px solid #e8d8be; background: #f8f0e3; color: #3d2e1e; font-size: 0.875rem; outline: none; }
        .input:focus { box-shadow: 0 0 0 2px rgba(196,98,45,0.2); }
      `}</style>
    </div>
  );
}
