"use client";
import { useState } from "react";

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
    </svg>
  );
}

export default function ContactSection({ fullPage = false }: { fullPage?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mqenedgv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject || "Žinutė iš svetainės", message: form.message }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-[#3d2e1e] text-sm focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d] placeholder-[#b0946a]";

  return (
    <section id="kontaktai" className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0e6d0 0%, #e8d8be 100%)" }}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Susisiekite</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
            Mes visada <em className="italic text-[#c4622d]">atsakome</em>
          </h2>
          <p className="text-[#7a5c40] max-w-lg mx-auto">
            Norite tapti laikinu globėju ar tiesiog paklausti — rašykite! Atsakysime kuo greičiau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon: "📧", label: "El. paštas", value: "info@linksmauodegele.lt", href: "mailto:info@linksmauodegele.lt" },
              { icon: "📍", label: "Adresas", value: "Didlaukio g. 78-16, Vilnius", href: null },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl p-5 border border-[#e8d8be] flex gap-4">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-[#c4622d] font-medium text-sm hover:underline"
                      target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[#3d2e1e] font-medium text-sm">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social media */}
            <div className="bg-white rounded-2xl p-5 border border-[#e8d8be]">
              <div className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider mb-3">Socialiniai tinklai</div>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/linksmauodegele" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#1877F2" }} aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://www.instagram.com/linksma.uodegele" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
                  aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://www.tiktok.com/@vsi.linksmauodegele" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#010101" }} aria-label="TikTok">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            <div className="bg-[#c4622d] rounded-2xl p-5 text-white">
              <div className="text-2xl mb-2">🙋</div>
              <h3 className="font-display font-bold text-lg mb-1">Tapkite savanoriu!</h3>
              <p className="text-sm text-white/80 mb-3">
                Laikina globa, vežiojimas pas veterinarą, socialiniai tinklai — visi galite prisidėti.
              </p>
              <a href="mailto:info@linksmauodegele.lt?subject=Noriu%20tapti%20savanoriu"
                className="inline-block text-sm font-semibold underline">
                Rašykite mums →
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm">
            <h3 className="font-display text-xl font-bold text-[#1e1a17] mb-6">Parašykite mums</h3>

            {status === "sent" ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <p className="font-semibold text-[#1e1a17] text-lg mb-2">Ačiū! Žinutė išsiųsta.</p>
                <p className="text-[#7a5c40] text-sm mb-6">
                  Susisieksime su jumis kuo greičiau. Jei skubu — rašykite tiesiai:{" "}
                  <a href="mailto:info@linksmauodegele.lt" className="text-[#c4622d] underline">info@linksmauodegele.lt</a>
                </p>
                <button onClick={() => setStatus("idle")} className="text-sm text-[#c4622d] underline">Siųsti dar vieną</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">Vardas *</label>
                    <input id="name" type="text" required placeholder="Jūsų vardas" className={inputClass}
                      value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">El. paštas *</label>
                    <input id="email" type="email" required placeholder="jusu@pastas.lt" className={inputClass}
                      value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">Tema</label>
                  <select id="subject" className={inputClass} value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                    <option value="">Pasirinkite temą</option>
                    <option value="Noriu įsivaikinti">Noriu įsivaikinti</option>
                    <option value="Noriu tapti laikinu globėju">Noriu tapti laikinu globėju</option>
                    <option value="Noriu savanoriauti">Noriu savanoriauti</option>
                    <option value="Noriu paaukoti">Noriu paaukoti</option>
                    <option value="Kita">Kita</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">Žinutė *</label>
                  <textarea id="message" rows={4} required placeholder="Jūsų žinutė..." className={`${inputClass} resize-none`}
                    value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Klaida. Bandykite rašyti tiesiai: info@linksmauodegele.lt</p>
                )}

                <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center disabled:opacity-50">
                  {status === "sending" ? "Siunčiama..." : "📨 Siųsti žinutę"}
                </button>
                <p className="text-xs text-[#7a5c40] text-center">
                  Arba rašykite tiesiai:{" "}
                  <a href="mailto:info@linksmauodegele.lt" className="text-[#c4622d] underline">info@linksmauodegele.lt</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
