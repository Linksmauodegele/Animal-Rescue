"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type AboutContent = {
  id?: string;
  heading: string;
  subheading: string;
  paragraph1: string;
  paragraph2: string;
  value1_title: string;
  value1_desc: string;
  value2_title: string;
  value2_desc: string;
  value3_title: string;
  value3_desc: string;
  image_url?: string;
};

const DEFAULT: AboutContent = {
  heading: "Mes esame jų balsas, kai jie neturi kito",
  subheading: "Apie mus",
  paragraph1: "VšĮ „Linksma uodegėlė\" – tai nevyriausybinė organizacija, kuri jau kelerius metus keičia nuskriaustų gyvūnų likimus Vilniuje ir aplinkinėse vietovėse.",
  paragraph2: "Mes neturime savo prieglaudos patalpų — kiekvienas mūsų globotinis gyvena savanorių šeimoje, kur gauna meilę, priežiūrą ir šilumą, kol suras tikrus namus.",
  value1_title: "Laikina globa",
  value1_desc: "Visi globotiniai gyvena savanorių namų globose, ne narveliuose",
  value2_title: "Pilnas gydymas",
  value2_desc: "Kiekvienas gyvūnas gauna veterinarinę pagalbą ir visus skiepus",
  value3_title: "Atsakingas įvaikinimas",
  value3_desc: "Rūpestingai tikriname būsimus šeimininkus",
};

export default function ApieAdmin() {
  const [form, setForm] = useState<AboutContent>(DEFAULT);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("about_content").select("*").limit(1).single();
      if (data) setForm(data as AboutContent);
    }
    load();
  }, []);

  function set(key: keyof AboutContent, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `about/main.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (error) {
      setUploadError("Klaida įkeliant: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm(f => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
  }

  async function handleSave() {
    setLoading(true);
    const payload = { ...form };
    if (form.id) {
      await supabase.from("about_content").update(payload).eq("id", form.id);
    } else {
      const { data } = await supabase.from("about_content").insert(payload).select().single();
      if (data) setForm(data as AboutContent);
    }
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const field = (label: string, key: keyof AboutContent, rows?: number) => (
    <div>
      <label className="label">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          className="input resize-none"
          value={form[key] as string}
          onChange={e => set(key, e.target.value)}
        />
      ) : (
        <input className="input" value={form[key] as string} onChange={e => set(key, e.target.value)} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">ℹ️ Apie mus</h1>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium">
            ✅ Išsaugota sėkmingai!
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm space-y-5">

          {/* Image upload */}
          <div>
            <p className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider border-b border-[#e8d8be] pb-3 mb-4">Nuotrauka</p>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[#e8d8be] rounded-2xl overflow-hidden cursor-pointer hover:border-[#c4622d] transition-colors"
            >
              {form.image_url ? (
                <div className="relative">
                  <img src={form.image_url} alt="preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center">
                    <span className="opacity-0 hover:opacity-100 bg-white rounded-xl px-3 py-1 text-xs text-[#5c3d1e] font-medium">Pakeisti</span>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-[#b0946a] gap-2">
                  {uploading ? (
                    <p className="text-[#c4622d] text-sm animate-pulse">⏳ Keliama...</p>
                  ) : (
                    <>
                      <span className="text-3xl">📷</span>
                      <span className="text-sm">Spustelėkite, kad įkeltumėte nuotrauką</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
            {form.image_url && (
              <button
                onClick={() => setForm(f => ({ ...f, image_url: "" }))}
                className="mt-2 text-xs text-red-400 hover:text-red-600"
              >
                × Pašalinti nuotrauką
              </button>
            )}
          </div>

          <p className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider border-b border-[#e8d8be] pb-3">Antraštės</p>
          {field("Skyriaus žyma (virš antraštės)", "subheading")}
          {field("Pagrindinė antraštė", "heading", 2)}

          <p className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider border-b border-[#e8d8be] pb-3 pt-2">Tekstas</p>
          {field("Pirma pastraipa", "paragraph1", 3)}
          {field("Antra pastraipa", "paragraph2", 3)}

          <p className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider border-b border-[#e8d8be] pb-3 pt-2">Vertybės</p>
          <div className="grid grid-cols-2 gap-3">
            {field("Vertybė 1 – pavadinimas", "value1_title")}
            {field("Vertybė 1 – aprašymas", "value1_desc")}
            {field("Vertybė 2 – pavadinimas", "value2_title")}
            {field("Vertybė 2 – aprašymas", "value2_desc")}
            {field("Vertybė 3 – pavadinimas", "value3_title")}
            {field("Vertybė 3 – aprašymas", "value3_desc")}
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#c4622d] text-white font-bold hover:bg-[#e07a4a] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Saugoma..." : "💾 Išsaugoti"}
          </button>
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
