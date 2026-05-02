"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  emoji: string;
  color: string;
  image_url?: string;
  display_order: number;
};

const EMPTY = {
  title: "", price: "", description: "", emoji: "👜", color: "#fde8cc", image_url: "", display_order: 0,
};

const EMOJI_OPTIONS = ["👜", "🧺", "🧦", "🪡", "🧣", "🧤", "🎀", "🛍️"];
const COLOR_OPTIONS = ["#fde8cc", "#d4e8f0", "#d4f0e0", "#e8e0f8", "#f0e8d4", "#f8e8d0", "#fce4ec", "#e8f5e9"];

export default function IsigykAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [hasImageCol, setHasImageCol] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("shop_products").select("*").order("display_order");
    if (data && data.length > 0) {
      setHasImageCol("image_url" in data[0]);
      setProducts(data);
    } else if (data) {
      // Table exists but empty — check schema via a test insert approach skipped, assume no column yet
      setProducts([]);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const fileName = `shop_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(fileName, file, { upsert: true });
    if (error) {
      setUploadError("Klaida įkeliant: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);
    setForm(f => ({ ...f, image_url: urlData.publicUrl }));
    setUploading(false);
  }

  async function handleSave() {
    setLoading(true);
    setSaveError(null);
    // Only include image_url if column exists in table
    const { image_url, ...coreFields } = form;
    const payload: Record<string, unknown> = {
      ...coreFields,
      display_order: form.display_order || products.length,
    };
    if (hasImageCol !== false && image_url) {
      payload.image_url = image_url;
    }

    let error;
    if (editId) {
      ({ error } = await supabase.from("shop_products").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("shop_products").insert(payload));
    }

    if (error) {
      // If the error is about image_url column not existing, retry without it
      if (error.message?.includes("image_url")) {
        setHasImageCol(false);
        delete payload.image_url;
        if (editId) {
          await supabase.from("shop_products").update(payload).eq("id", editId);
        } else {
          await supabase.from("shop_products").insert(payload);
        }
      } else {
        setSaveError("Klaida išsaugant: " + error.message);
        setLoading(false);
        return;
      }
    }

    await fetchProducts();
    setForm({ ...EMPTY }); setEditId(null); setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ištrinti šį produktą?")) return;
    await supabase.from("shop_products").delete().eq("id", id);
    await fetchProducts();
  }

  function startEdit(p: Product) {
    const { id, ...rest } = p;
    setForm({ ...EMPTY, ...rest });
    setEditId(id);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🛍️ Įsigyk sau – padėk gyvūnui</h1>
          </div>
          <button
            onClick={() => { setForm({ ...EMPTY }); setEditId(null); setShowForm(true); setSaveError(null); }}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors"
          >
            + Pridėti
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-5">{editId ? "Redaguoti produktą" : "Naujas produktas"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Pavadinimas *</label>
                  <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="pvz. Rankinė ant peties" />
                </div>
                <div>
                  <label className="label">Kaina *</label>
                  <input className="input" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="pvz. 40€" />
                </div>
              </div>

              <div>
                <label className="label">Aprašymas</label>
                <textarea className="input resize-none" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Trumpas aprašymas..." />
              </div>

              {/* Image upload */}
              <div>
                <label className="label">
                  Produkto nuotrauka
                  {hasImageCol === false && (
                    <span className="ml-2 text-amber-600 normal-case font-normal">
                      ⚠️ Reikia pridėti <code className="bg-amber-50 px-1 rounded">image_url</code> stulpelį lentelėje
                    </span>
                  )}
                </label>
                <div className="flex gap-4 items-start">
                  {form.image_url ? (
                    <div className="relative">
                      <img src={form.image_url} alt="preview" className="w-24 h-24 object-cover rounded-xl border border-[#e8d8be]" />
                      <button
                        onClick={() => setForm(f => ({ ...f, image_url: "" }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                      >×</button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 rounded-xl border-2 border-dashed border-[#e8d8be] flex flex-col items-center justify-center cursor-pointer hover:border-[#c4622d] hover:bg-[#fdf5ee] transition-all text-[#b0946a] text-xs text-center gap-1"
                    >
                      <span className="text-2xl">📷</span>
                      <span>Įkelti</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-4 py-2 border border-[#e8d8be] rounded-xl text-sm text-[#5c3d1e] hover:bg-[#f8f0e3] disabled:opacity-50 transition-colors"
                    >
                      {uploading ? "Įkeliama..." : form.image_url ? "Pakeisti nuotrauką" : "Pasirinkti failą"}
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
                    <p className="text-xs text-[#b0946a] mt-1">JPG, PNG, WEBP. Jei nėra — rodomas emoji.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Emoji (jei nėra nuotraukos)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {EMOJI_OPTIONS.map(e => (
                      <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))}
                        className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition-all ${form.emoji === e ? "border-[#c4622d] bg-[#fde8cc]" : "border-[#e8d8be] hover:border-[#c4622d]"}`}
                      >{e}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">Fono spalva</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {COLOR_OPTIONS.map(c => (
                      <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                        className={`w-10 h-10 rounded-xl border-2 transition-all ${form.color === c ? "border-[#c4622d] scale-110" : "border-[#e8d8be]"}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {saveError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {saveError}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={loading || !form.title || !form.price}
                className="px-6 py-2.5 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] disabled:opacity-50">
                {loading ? "Saugoma..." : "💾 Išsaugoti"}
              </button>
              <button onClick={() => { setShowForm(false); setSaveError(null); }} className="px-6 py-2.5 border border-[#e8d8be] rounded-xl text-sm text-[#5c3d1e] hover:bg-[#f8f0e3]">
                Atšaukti
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-[#7a5c40] bg-white rounded-3xl border border-[#e8d8be]">Nėra produktų. Pridėkite pirmąjį!</div>
          ) : products.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#e8d8be] overflow-hidden">
              <div className="h-28 flex items-center justify-center" style={{ background: p.color }}>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl">{p.emoji}</span>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-[#1e1a17] text-sm leading-tight">{p.title}</p>
                  <span className="text-[#c4622d] font-bold text-sm ml-1">{p.price}</span>
                </div>
                <p className="text-xs text-[#7a5c40] mb-2 line-clamp-2">{p.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="flex-1 text-xs py-1 rounded-lg bg-[#f8f0e3] text-[#5c3d1e] hover:bg-[#f0e6d0]">✏️</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs py-1 px-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100">🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasImageCol === false && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <strong>Norėdami naudoti nuotraukas,</strong> pridėkite stulpelį Supabase SQL redaktoriuje:<br />
            <code className="block mt-1 bg-amber-100 px-2 py-1 rounded font-mono">ALTER TABLE shop_products ADD COLUMN image_url TEXT DEFAULT '';</code>
          </div>
        )}
      </div>

      <style jsx>{`
        .label { display: block; font-size: 0.75rem; font-weight: 600; color: #5c3d1e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.375rem; }
        .input { width: 100%; padding: 0.625rem 1rem; border-radius: 0.75rem; border: 1px solid #e8d8be; background: #f8f0e3; color: #3d2e1e; font-size: 0.875rem; outline: none; }
        .input:focus { box-shadow: 0 0 0 2px rgba(196,98,45,0.2); }
      `}</style>
    </div>
  );
}
