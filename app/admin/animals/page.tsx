"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Animal = {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: string;
  breed: string;
  status: string;
  description: string;
  tags: string[];
  image_url: string;
  gallery_images: string[];
  birthday: string;
  shelter_since: string;
};

const EMPTY: Omit<Animal, "id"> = {
  name: "", type: "dog", age: "", breed: "",
  status: "Ieško namų", description: "", tags: [], image_url: "",
  gallery_images: [], birthday: "", shelter_since: "",
};

const STATUSES = ["Ieško namų", "Laikina globa", "Įsivaikinta", "Gydomas"];

export default function AnimalsAdmin() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [form, setForm] = useState<Omit<Animal, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchAnimals(); }, []);

  async function fetchAnimals() {
    const { data } = await supabase.from("animals").select("*").order("created_at", { ascending: false });
    if (data) setAnimals(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `animals/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setForm(f => ({ ...f, image_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `animals/gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    setForm(f => ({ ...f, gallery_images: [...(f.gallery_images || []), ...urls] }));
    setGalleryUploading(false);
    if (galleryRef.current) galleryRef.current.value = "";
  }

  function removeGalleryImage(url: string) {
    setForm(f => ({ ...f, gallery_images: f.gallery_images.filter(u => u !== url) }));
  }

  async function handleSave() {
    setLoading(true);
    if (editId) {
      await supabase.from("animals").update(form).eq("id", editId);
    } else {
      await supabase.from("animals").insert(form);
    }
    await fetchAnimals();
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar tikrai norite ištrinti?")) return;
    await supabase.from("animals").delete().eq("id", id);
    await fetchAnimals();
  }

  function startEdit(animal: Animal) {
    const { id, ...rest } = animal;
    setForm({ ...EMPTY, ...rest, gallery_images: rest.gallery_images || [] });
    setEditId(id);
    setShowForm(true);
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🐾 Globotiniai</h1>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors">
            + Pridėti
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-6">{editId ? "Redaguoti" : "Naujas globotinis"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Vardas</label>
                <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Tipas</label>
                <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}>
                  <option value="dog">Šuo</option>
                  <option value="cat">Katė</option>
                  <option value="other">Kitas</option>
                </select>
              </div>
              <div>
                <label className="label">Gimimo data</label>
                <input className="input" type="date" value={form.birthday} onChange={e => setForm(f => ({ ...f, birthday: e.target.value }))} />
              </div>
              <div>
                <label className="label">Prieglaudoje nuo</label>
                <input className="input" type="date" value={form.shelter_since} onChange={e => setForm(f => ({ ...f, shelter_since: e.target.value }))} />
              </div>
              <div>
                <label className="label">Amžius (tekstas, pvz. "2 metai")</label>
                <input className="input" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
              </div>
              <div>
                <label className="label">Veislė</label>
                <input className="input" value={form.breed} onChange={e => setForm(f => ({ ...f, breed: e.target.value }))} />
              </div>
              <div>
                <label className="label">Statusas</label>
                <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Pagrindinė nuotrauka</label>
                <div className="flex gap-2">
                  <input className="input flex-1" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="URL arba įkelkite" />
                  <button onClick={() => fileRef.current?.click()} className="px-3 py-2 bg-[#f8f0e3] border border-[#e8d8be] rounded-xl text-sm hover:bg-[#f0e6d0]">
                    {uploading ? "⏳" : "📁"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
                {form.image_url && <img src={form.image_url} className="mt-2 h-20 rounded-xl object-cover" />}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Galerija (papildomos nuotraukos)</label>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => galleryRef.current?.click()}
                    className="px-4 py-2 bg-[#f8f0e3] border border-[#e8d8be] rounded-xl text-sm hover:bg-[#f0e6d0] flex items-center gap-2">
                    {galleryUploading ? "⏳ Įkeliama..." : "📁 Įkelti nuotraukas"}
                  </button>
                  <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                </div>
                {form.gallery_images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.gallery_images.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} className="w-20 h-20 rounded-xl object-cover" />
                        <button onClick={() => removeGalleryImage(url)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Aprašymas</label>
                <textarea className="input h-24 resize-none" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Žymos</label>
                <div className="flex gap-2 mb-2">
                  <input className="input flex-1" value={tagInput} onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTag()} placeholder="Įveskite žymą ir spauskite Enter" />
                  <button onClick={addTag} className="px-4 py-2 bg-[#f8f0e3] border border-[#e8d8be] rounded-xl text-sm">+</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-[#f8f0e3] border border-[#e8d8be] rounded-full text-sm flex items-center gap-1">
                      {t}
                      <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} className="text-[#c4622d] font-bold">×</button>
                    </span>
                  ))}
                </div>
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

        <div className="bg-white rounded-3xl border border-[#e8d8be] overflow-hidden shadow-sm">
          {animals.length === 0 ? (
            <div className="text-center py-16 text-[#7a5c40]">Nėra globotinių. Pridėkite pirmąjį!</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#f8f0e3] border-b border-[#e8d8be]">
                <tr>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Vardas</th>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Tipas</th>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Statusas</th>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Veislė</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {animals.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 0 ? "bg-white" : "bg-[#fdf8f3]"}>
                    <td className="px-5 py-3 font-medium text-[#1e1a17] flex items-center gap-3">
                      {a.image_url && <img src={a.image_url} className="w-8 h-8 rounded-lg object-cover" />}
                      {a.name}
                    </td>
                    <td className="px-5 py-3 text-[#5c3d1e]">{a.type === "dog" ? "🐕 Šuo" : a.type === "cat" ? "🐈 Katė" : "🐾 Kitas"}</td>
                    <td className="px-5 py-3"><span className="px-2.5 py-1 bg-[#f8f0e3] rounded-full text-xs">{a.status}</span></td>
                    <td className="px-5 py-3 text-[#5c3d1e]">{a.breed}</td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => startEdit(a)} className="text-[#c4622d] hover:underline mr-4 text-xs font-medium">Redaguoti</button>
                      <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:underline text-xs font-medium">Ištrinti</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
