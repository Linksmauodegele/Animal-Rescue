"use client";
import { useState, useEffect } from "react";

export default function VideoAdminPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=xaIAW_JFEdc");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("hero_youtube_id");
    if (stored) {
      setYoutubeUrl(`https://www.youtube.com/watch?v=${stored}`);
    }
  }, []);

  function extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  function handleSave() {
    setError("");
    const id = extractYouTubeId(youtubeUrl);
    if (!id) {
      setError("Neteisingas YouTube URL. Pavyzdys: https://www.youtube.com/watch?v=xaIAW_JFEdc");
      return;
    }
    localStorage.setItem("hero_youtube_id", id);
    localStorage.removeItem("hero_video_url");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    const defaultId = "xaIAW_JFEdc";
    localStorage.setItem("hero_youtube_id", defaultId);
    localStorage.removeItem("hero_video_url");
    setYoutubeUrl(`https://www.youtube.com/watch?v=${defaultId}`);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const previewId = extractYouTubeId(youtubeUrl);

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">🎬 Titulinis vaizdo įrašas</h1>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium">
            ✅ Išsaugota sėkmingai! Perkraukite pagrindinį puslapį, kad pamatytumėte pakeitimus.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm">
          <label className="text-xs font-semibold text-[#5c3d1e] uppercase tracking-wider block mb-2">
            YouTube video nuoroda
          </label>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => { setYoutubeUrl(e.target.value); setError(""); }}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-[#3d2e1e] text-sm focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 mb-2"
          />
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <p className="text-xs text-[#7a5c40] mb-6">
            Įklijuokite YouTube video nuorodą. Video bus rodomas kaip pagrindinio puslapio fonas. Rekomenduojame naudoti aukštos kokybės, be garso arba su garso išjungimu.
          </p>

          {previewId && (
            <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-black">
              <iframe
                key={previewId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${previewId}?start=4&autoplay=0`}
                title="Peržiūra"
                allow="encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-[#c4622d] text-white font-bold hover:bg-[#e07a4a] transition-colors"
            >
              💾 Išsaugoti nuorodą
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-5 rounded-xl border border-[#e8d8be] text-[#7a5c40] hover:text-[#c4622d] hover:border-[#c4622d] text-sm transition-colors"
            >
              🔄 Numatytasis
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#fff8f0] rounded-xl border border-[#e8d8be] text-xs text-[#7a5c40]">
          <strong>Pastaba:</strong> Nustatymai saugomi naršyklės atmintyje (localStorage). Jei norite, kad video veiktų visuose įrenginiuose, susisiekite su kūrėjais dėl serverio integracijos.
        </div>
      </div>
    </div>
  );
}
