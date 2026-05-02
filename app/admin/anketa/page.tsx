"use client";
import { useState, useEffect } from "react";

const DEFAULT_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPsSXRP6s31ugQktpD3WRLhds9jKtdspXJwDBOfyMeCvXVVg/viewform?embedded=true";

export default function AnketaAdminPage() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("anketa_form_url");
    if (stored) setUrl(stored);
  }, []);

  function handleSave() {
    setError("");
    if (!url.includes("docs.google.com/forms")) {
      setError("Neteisingas URL. Turi būti Google Forms nuoroda.");
      return;
    }
    // Ensure embedded=true is in the URL
    const embedUrl = url.includes("embedded=true") ? url : url.replace("viewform", "viewform?embedded=true");
    localStorage.setItem("anketa_form_url", embedUrl);
    setUrl(embedUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    localStorage.setItem("anketa_form_url", DEFAULT_URL);
    setUrl(DEFAULT_URL);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f8f0e3] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <a href="/admin" className="text-[#c4622d] hover:underline text-sm">← Atgal</a>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">📋 Adopcijos anketa</h1>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium">
            ✅ Išsaugota sėkmingai! Pakeitimai matomi iš karto.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm">
          <label className="text-xs font-semibold text-[#5c3d1e] uppercase tracking-wider block mb-2">
            Google Forms nuoroda
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(""); }}
            placeholder="https://docs.google.com/forms/d/e/.../viewform"
            className="w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-[#3d2e1e] text-sm focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 mb-2"
          />
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          <p className="text-xs text-[#7a5c40] mb-6">
            Įklijuokite Google Forms nuorodą. Anketa bus rodoma gyvūno puslapyje kai lankytojas spaudžia „Sužinoti daugiau".
          </p>

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
          <strong>Pastaba:</strong> Nustatymai saugomi naršyklės atmintyje (localStorage). Anketos turinį redaguokite tiesiogiai <a href="https://docs.google.com/forms" target="_blank" className="text-[#c4622d] underline">Google Forms</a> — pakeitimai matosi automatiškai.
        </div>
      </div>
    </div>
  );
}
