"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Animal = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  adopted_at?: string;
};

export default function RadoNamusAdmin() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchAnimals(); }, []);

  async function fetchAnimals() {
    const { data } = await supabase
      .from("rado_namus")
      .select("*")
      .order("adopted_at", { ascending: false });
    if (data) setAnimals(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `rado-namus/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (error) {
      setUploadError("Klaida įkeliant nuotrauką: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSave() {
    if (!name.trim()) return;
    setLoading(true);
    setSaveError(null);
    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      image_url: imageUrl.trim() || null,
    };
    let error;
    if (editId) {
      ({ error } = await supabase.from("rado_namus").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("rado_namus").insert({ ...payload, adopted_at: new Date().toISOString() }));
    }
    if (error) {
      setSaveError("Klaida išsaugant: " + error.message);
      setLoading(false);
      return;
    }
    await fetchAnimals();
    setName(""); setDescription(""); setImageUrl(""); setEditId(null); setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ištrinti šį gyvūną iš sąrašo?")) return;
    await supabase.from("rado_namus").delete().eq("id", id);
    await fetchAnimals();
  }

  function startEdit(a: Animal) {
    setName(a.name);
    setDescription(a.description || "");
    setImageUrl(a.image_url || "");
    setEditId(a.id);
    setSaveError(null);
    setShowForm(true);
  }

  function openNew() {
    setName(""); setDescription(""); setImageUrl(""); setEditId(null); setSaveError(null); setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🏠 Rado namus</h1>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors"
          >
            + Pridėti
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-5">{editId ? "Redaguoti" : "Naujas gyvūnas"}</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Gyvūno vardas *</label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="pvz. Tikis" />
              </div>

              <div>
                <label className="label">Aprašymas</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="pvz. Žaismingas katinukas, rado namus mylinčioje šeimoje..."
                />
              </div>

              <div>
                <label className="label">Nuotrauka</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#e8d8be] rounded-2xl p-6 text-center cursor-pointer hover:border-[#c4622d] hover:bg-[#fde8cc]/20 transition-all mb-3"
                >
                  {uploading ? (
                    <p className="text-[#c4622d] font-medium text-sm animate-pulse">⏳ Keliama...</p>
                  ) : imageUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={imageUrl} className="h-32 rounded-xl object-cover" alt="preview" />
                      <p className="text-xs text-[#7a5c40]">Spustelėkite, kad pakeistumėte</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📷</div>
                      <p className="text-[#5c3d1e] font-medium text-sm">Spustelėkite, kad įkeltumėte nuotrauką</p>
                      <p className="text-xs text-[#7a5c40] mt-1">JPG, PNG, WebP</p>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
                {uploadError && <p className="text-red-500 text-xs mb-2">{uploadError}</p>}

                <label className="label">arba įklijuokite URL</label>
                <input
                  className="input"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {saveError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {saveError}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={loading || !name.trim()}
                className="px-6 py-2.5 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] disabled:opacity-50 transition-colors"
              >
                {loading ? "Saugoma..." : "💾 Išsaugoti"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-[#e8d8be] rounded-xl text-sm text-[#5c3d1e] hover:bg-[#f8f0e3]">
                Atšaukti
              </button>
            </div>
          </div>
        )}

        {animals.length === 0 ? (
          <div className="text-center py-16 text-[#7a5c40] bg-white rounded-3xl border border-[#e8d8be]">
            Sąrašas tuščias. Pridėkite pirmą gyvūną!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {animals.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-[#e8d8be] overflow-hidden group">
                <div className="h-28 bg-[#f0e6d0] flex items-center justify-center overflow-hidden">
                  {a.image_url ? (
                    <img src={a.image_url} className="w-full h-full object-cover" alt={a.name} />
                  ) : (
                    <span className="text-4xl">🐱</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-[#1e1a17] text-sm">{a.name}</p>
                  {a.description && (
                    <p className="text-xs text-[#7a5c40] mt-0.5 mb-2 line-clamp-2">{a.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => startEdit(a)} className="flex-1 text-xs py-1 rounded-lg bg-[#f8f0e3] text-[#5c3d1e] hover:bg-[#f0e6d0] transition-colors">
                      ✏️ Redaguoti
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="text-xs py-1 px-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
