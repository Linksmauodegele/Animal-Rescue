"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Remejas = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  display_order: number;
};

const EMPTY: Omit<Remejas, "id"> = { name: "", logo_url: "", website_url: "", description: "", display_order: 0 };

export default function RemejaiAdmin() {
  const [remejai, setRemejai] = useState<Remejas[]>([]);
  const [form, setForm] = useState<Omit<Remejas, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchRemejai(); }, []);

  async function fetchRemejai() {
    const { data } = await supabase.from("remejai").select("*").order("display_order");
    if (data) setRemejai(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `remejai/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setForm(f => ({ ...f, logo_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave() {
    setLoading(true);
    const payload = { ...form, display_order: form.display_order || remejai.length };
    if (editId) {
      await supabase.from("remejai").update(payload).eq("id", editId);
    } else {
      await supabase.from("remejai").insert(payload);
    }
    await fetchRemejai();
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar tikrai norite ištrinti?")) return;
    await supabase.from("remejai").delete().eq("id", id);
    await fetchRemejai();
  }

  async function moveUp(i: number) {
    if (i === 0) return;
    const a = remejai[i], b = remejai[i - 1];
    await supabase.from("remejai").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("remejai").update({ display_order: a.display_order }).eq("id", b.id);
    await fetchRemejai();
  }

  async function moveDown(i: number) {
    if (i === remejai.length - 1) return;
    const a = remejai[i], b = remejai[i + 1];
    await supabase.from("remejai").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("remejai").update({ display_order: a.display_order }).eq("id", b.id);
    await fetchRemejai();
  }

  function startEdit(r: Remejas) {
    const { id, ...rest } = r;
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
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">💛 Rėmėjai</h1>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors">
            + Pridėti
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-6">{editId ? "Redaguoti rėmėją" : "Naujas rėmėjas"}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Vardas / Pavadinimas</label>
                <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Logotipas / Nuotrauka</label>
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
                <label className="label">Svetainės nuoroda (neprivaloma)</label>
                <input className="input" value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label className="label">Aprašymas (neprivaloma)</label>
                <input className="input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="pvz. Veterinarijos klinika" />
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
          {remejai.length === 0 ? (
            <div className="text-center py-16 text-[#7a5c40] bg-white rounded-3xl border border-[#e8d8be]">Nėra rėmėjų. Pridėkite pirmąjį!</div>
          ) : remejai.map((r, i) => (
            <div key={r.id} className="bg-white rounded-2xl border border-[#e8d8be] p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="text-xs text-[#7a5c40] hover:text-[#c4622d] disabled:opacity-30">▲</button>
                <button onClick={() => moveDown(i)} disabled={i === remejai.length - 1} className="text-xs text-[#7a5c40] hover:text-[#c4622d] disabled:opacity-30">▼</button>
              </div>
              {r.logo_url ? (
                <img src={r.logo_url} className="h-12 w-20 object-contain rounded-lg" />
              ) : (
                <div className="h-12 w-20 bg-[#f8f0e3] rounded-xl flex items-center justify-center text-2xl">💛</div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-[#1e1a17]">{r.name}</p>
                {r.description && <p className="text-xs text-[#7a5c40]">{r.description}</p>}
                {r.website_url && <a href={r.website_url} target="_blank" className="text-xs text-[#c4622d] hover:underline">{r.website_url}</a>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => startEdit(r)} className="text-[#c4622d] hover:underline text-xs font-medium">Redaguoti</button>
                <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:underline text-xs font-medium">Ištrinti</button>
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
