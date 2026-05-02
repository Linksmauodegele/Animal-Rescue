"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  size: number;
  mime_type: string;
  uploaded_at: string;
};

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchMedia(); }, []);

  async function fetchMedia() {
    const { data } = await supabase.from("media").select("*").order("uploaded_at", { ascending: false });
    if (data) setItems(data);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `uploads/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      await supabase.from("media").insert({
        filename: file.name,
        url: data.publicUrl,
        size: file.size,
        mime_type: file.type,
      });
      await fetchMedia();
    }
    setUploading(false);
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  }

  async function handleDelete(item: MediaItem) {
    if (!confirm("Ištrinti šį failą?")) return;
    const path = item.url.split("/media/")[1];
    await supabase.storage.from("media").remove([path]);
    await supabase.from("media").delete().eq("id", item.id);
    await fetchMedia();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🖼️ Medijos biblioteka</h1>
        </div>

        <div className="mb-8 p-5 bg-white rounded-2xl border border-[#e8d8be] text-sm text-[#5c3d1e]">
          <p className="font-semibold text-[#1e1a17] mb-2">📌 Kam skirta ši biblioteka?</p>
          <p className="mb-2">Čia saugomi <strong>visi svetainėje naudojami failai</strong> – nuotraukos ir dokumentai. Naudokite ją kaip centrinę saugyklą:</p>
          <ul className="space-y-1 text-[#7a5c40]">
            <li>🐾 <strong>Globotinių nuotraukos</strong> – įkelkite čia, nukopijuokite URL į „Globotiniai" skiltį</li>
            <li>🏠 <strong>Rado namus nuotraukos</strong> – įkelkite čia, URL naudokite „Rado namus" skiltyje</li>
            <li>📝 <strong>Straipsnių viršeliai</strong> – nuotraukos naujienoms / tinklaraščiui</li>
            <li>🤝 <strong>Partnerių logotipai</strong> – įkelkite čia, URL naudokite „Partneriai" skiltyje</li>
            <li>🛍️ <strong>Produktų nuotraukos</strong> – mezginiai ir kiti parduodami daiktai</li>
          </ul>
          <p className="mt-3 text-xs text-[#7a5c40]">💡 Patarimas: įkelkite failą → spustelėkite „📋 URL" → įklijuokite reikiamoje skiltyje.</p>
        </div>

        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all mb-8 ${dragOver ? "border-[#c4622d] bg-[#fde8cc]/40" : "border-[#e8d8be] bg-white hover:border-[#c4622d] hover:bg-[#fff8f0]"}`}
        >
          <div className="text-4xl mb-3">{uploading ? "⏳" : "📁"}</div>
          <p className="text-[#5c3d1e] font-medium">{uploading ? "Keliama..." : "Vilkite failus čia arba spustelėkite"}</p>
          <p className="text-xs text-[#7a5c40] mt-1">JPG, PNG, WebP, SVG, MP4</p>
          <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={e => handleFiles(e.target.files)} />
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <div className="text-center py-16 text-[#7a5c40] bg-white rounded-3xl border border-[#e8d8be]">Nėra įkeltų failų.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#e8d8be] overflow-hidden group">
                <div className="aspect-square bg-[#f8f0e3] relative overflow-hidden">
                  {item.mime_type?.startsWith("image") ? (
                    <img src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🎬</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#1e1a17] font-medium truncate">{item.filename}</p>
                  <p className="text-xs text-[#7a5c40]">{formatSize(item.size)}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => copyUrl(item.url)}
                      className="flex-1 text-xs py-1 rounded-lg bg-[#f8f0e3] text-[#5c3d1e] hover:bg-[#f0e6d0] transition-colors">
                      {copied === item.url ? "✓ Nukopijuota" : "📋 URL"}
                    </button>
                    <button onClick={() => handleDelete(item)}
                      className="text-xs py-1 px-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
