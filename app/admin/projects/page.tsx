"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  image_url: string;
  active: boolean;
  sort_order: number;
};

const EMPTY: Omit<Project, "id"> = {
  title: "",
  description: "",
  url: "",
  platform: "",
  image_url: "",
  active: true,
  sort_order: 0,
};

const inputClass =
  "w-full border border-[#e8d8be] rounded-xl px-4 py-2.5 text-sm text-[#1e1a17] focus:outline-none focus:border-[#c4622d] bg-white";
const labelClass =
  "block text-xs font-semibold text-[#7a5c40] uppercase tracking-wider mb-1";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setProjects(data);
  }

  async function handleSave() {
    setLoading(true);
    if (editId) {
      await supabase.from("projects").update(form).eq("id", editId);
    } else {
      await supabase.from("projects").insert(form);
    }
    await fetchProjects();
    setForm(EMPTY);
    setEditId(null);
    setShowForm(false);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Ar tikrai norite ištrinti šį projektą?")) return;
    await supabase.from("projects").delete().eq("id", id);
    await fetchProjects();
  }

  function startEdit(p: Project) {
    setForm({
      title: p.title,
      description: p.description,
      url: p.url,
      platform: p.platform,
      image_url: p.image_url,
      active: p.active,
      sort_order: p.sort_order,
    });
    setEditId(p.id);
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">
            ← Atgal
          </a>
          <span className="text-[#b0946a]">/</span>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">
            🚀 Projektai
          </h1>
        </div>

        {/* Project list */}
        <div className="space-y-3 mb-6">
          {projects.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-[#e8d8be] text-center text-[#7a5c40]">
              Kol kas projektų nėra. Pridėkite pirmąjį!
            </div>
          )}
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-5 border border-[#e8d8be] flex gap-4 items-start"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#1e1a17]">{p.title}</span>
                  {p.platform && (
                    <span className="text-xs bg-[#f8f0e3] border border-[#e8d8be] rounded-full px-2 py-0.5 text-[#7a5c40]">
                      {p.platform}
                    </span>
                  )}
                  {!p.active && (
                    <span className="text-xs bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 text-gray-400">
                      Neaktyvus
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#7a5c40] truncate">{p.description}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#c4622d] hover:underline"
                  >
                    {p.url}
                  </a>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(p)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#e8d8be] hover:border-[#c4622d] transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/edit form */}
        {showForm ? (
          <div className="bg-white rounded-2xl p-6 border border-[#e8d8be] space-y-4">
            <h2 className="font-semibold text-[#1e1a17]">
              {editId ? "Redaguoti projektą" : "Pridėti naują projektą"}
            </h2>
            <div>
              <label className={labelClass}>Pavadinimas *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="pvz. Aukok.lt – vasaros kampanija"
              />
            </div>
            <div>
              <label className={labelClass}>Aprašymas</label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Trumpas projekto aprašymas..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nuoroda (URL)</label>
                <input
                  className={inputClass}
                  value={form.url}
                  onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  placeholder="https://aukok.lt/..."
                />
              </div>
              <div>
                <label className={labelClass}>Platforma</label>
                <input
                  className={inputClass}
                  value={form.platform}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, platform: e.target.value }))
                  }
                  placeholder="pvz. Aukok.lt"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nuotraukos URL</label>
                <input
                  className={inputClass}
                  value={form.image_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image_url: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={labelClass}>Rikiavimo nr.</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
                className="w-4 h-4 accent-[#c4622d]"
              />
              <label htmlFor="active" className="text-sm text-[#5c3d1e] font-medium">
                Rodomas svetainėje
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={loading || !form.title}
                className="px-6 py-2.5 bg-[#c4622d] text-white rounded-xl font-semibold text-sm hover:bg-[#e07a4a] disabled:opacity-50"
              >
                {loading ? "Saugoma..." : editId ? "Išsaugoti" : "Pridėti"}
              </button>
              <button
                onClick={() => {
                  setForm(EMPTY);
                  setEditId(null);
                  setShowForm(false);
                }}
                className="px-6 py-2.5 border border-[#e8d8be] rounded-xl text-sm text-[#7a5c40] hover:bg-[#f8f0e3]"
              >
                Atšaukti
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full border-2 border-dashed border-[#e8d8be] rounded-2xl py-5 text-[#c4622d] font-semibold hover:border-[#c4622d] transition-colors"
          >
            + Pridėti naują projektą
          </button>
        )}
      </div>
    </div>
  );
}
