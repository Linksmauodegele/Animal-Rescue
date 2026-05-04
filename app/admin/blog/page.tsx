"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  video_url: string;
  published: boolean;
  published_at: string | null;
};

const EMPTY: Omit<Post, "id"> = {
  title: "", slug: "", excerpt: "", content: "",
  cover_image_url: "", video_url: "", published: false, published_at: null,
};

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Omit<Post, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setError(null);
    const { data, error: err } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (err) setError(`Klaida kraunant straipsnius: ${err.message}`);
    else if (data) setPosts(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `blog/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setForm(f => ({ ...f, cover_image_url: data.publicUrl }));
    }
    setUploading(false);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    const payload = {
      ...form,
      published_at: form.published && !form.published_at ? new Date().toISOString() : form.published_at,
    };
    let err;
    if (editId) {
      ({ error: err } = await supabase.from("posts").update(payload).eq("id", editId));
    } else {
      ({ error: err } = await supabase.from("posts").insert(payload));
    }
    if (err) { setError(`Klaida išsaugant: ${err.message}`); setLoading(false); return; }
    await fetchPosts();
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar tikrai norite ištrinti?")) return;
    const { error: err } = await supabase.from("posts").delete().eq("id", id);
    if (err) { setError(`Klaida trinant: ${err.message}`); return; }
    await fetchPosts();
  }

  async function togglePublish(post: Post) {
    await supabase.from("posts").update({
      published: !post.published,
      published_at: !post.published ? new Date().toISOString() : post.published_at,
    }).eq("id", post.id);
    await fetchPosts();
  }

  function startEdit(post: Post) {
    const { id, ...rest } = post;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
            <h1 className="font-display text-2xl font-bold text-[#1e1a17]">📝 Naujienos / Tinklaraštis</h1>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="px-5 py-2 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] transition-colors">
            + Naujas straipsnis
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm mb-8">
            <h2 className="font-bold text-lg text-[#1e1a17] mb-6">{editId ? "Redaguoti straipsnį" : "Naujas straipsnis"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label">Pavadinimas</label>
                <input className="input" value={form.title} onChange={e => {
                  const title = e.target.value;
                  setForm(f => ({ ...f, title, slug: f.slug || toSlug(title) }));
                }} />
              </div>
              <div>
                <label className="label">Slug (URL)</label>
                <input className="input" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: toSlug(e.target.value) }))} />
              </div>
              <div>
                <label className="label">Viršelio nuotrauka</label>
                <div className="flex gap-2">
                  <input className="input flex-1" value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))} placeholder="URL arba įkelkite" />
                  <button onClick={() => fileRef.current?.click()} className="px-3 py-2 bg-[#f8f0e3] border border-[#e8d8be] rounded-xl text-sm">
                    {uploading ? "⏳" : "📁"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>
                {form.cover_image_url && <img src={form.cover_image_url} className="mt-2 h-20 rounded-xl object-cover" />}
              </div>
              <div>
                <label className="label">🎬 Video URL (YouTube arba kita nuoroda)</label>
                <input className="input" value={form.video_url} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." />
                <p className="text-xs text-[#7a5c40] mt-1">Jei įvesite YouTube nuorodą, vaizdo įrašas rodomas straipsnyje po paveikslėliu.</p>
              </div>
              <div className="sm:col-span-2">
                <label className="label">Santrauka</label>
                <textarea className="input h-20 resize-none" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Turinys</label>
                <textarea className="input h-48 resize-none font-mono text-xs" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Galite naudoti HTML žymes..." />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-[#c4622d]" />
                <label htmlFor="published" className="text-sm text-[#5c3d1e] font-medium">Publikuoti iš karto</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={loading || !form.title}
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
          {posts.length === 0 ? (
            <div className="text-center py-16 text-[#7a5c40]">Nėra straipsnių. Parašykite pirmąjį!</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#f8f0e3] border-b border-[#e8d8be]">
                <tr>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Pavadinimas</th>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Statusas</th>
                  <th className="text-left px-5 py-3 text-[#5c3d1e] font-semibold">Data</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-[#fdf8f3]"}>
                    <td className="px-5 py-3 font-medium text-[#1e1a17]">
                      {p.title}
                      <div className="text-xs text-[#7a5c40] font-normal">/{p.slug}</div>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => togglePublish(p)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.published ? "✓ Publikuota" : "Juodraštis"}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-[#7a5c40] text-xs">
                      {p.published_at ? new Date(p.published_at).toLocaleDateString("lt-LT") : "—"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => startEdit(p)} className="text-[#c4622d] hover:underline mr-4 text-xs font-medium">Redaguoti</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline text-xs font-medium">Ištrinti</button>
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
