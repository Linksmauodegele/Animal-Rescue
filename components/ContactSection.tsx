"use client";
import { useState } from "react";

export default function ContactSection({ fullPage = false }: { fullPage?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      // Sends via mailto as a reliable fallback that always works
      const subject = encodeURIComponent(`[Svetainė] ${form.subject || "Žinutė"} – ${form.name}`);
      const body = encodeURIComponent(
        `Vardas: ${form.name}\nEl. paštas: ${form.email}\nTema: ${form.subject}\n\nŽinutė:\n${form.message}`
      );
      window.location.href = `mailto:info@linksmauodegele.lt?subject=${subject}&body=${body}`;
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-[#e8d8be] bg-[#f8f0e3] text-[#3d2e1e] text-sm focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d] placeholder-[#b0946a]";

  return (
    <section
      id="kontaktai"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0e6d0 0%, #e8d8be 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Susisiekite</p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#1e1a17] mb-4">
            Mes visada <em className="italic text-[#c4622d]">atsakome</em>
          </h2>
          <p className="text-[#7a5c40] max-w-lg mx-auto">
            Norite įsivaikinti, tapti laikinu globėju ar tiesiog paklausti — rašykite! Atsakysime kuo greičiau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon: "📧", label: "El. paštas", value: "info@linksmauodegele.lt", href: "mailto:info@linksmauodegele.lt" },
              { icon: "📍", label: "Adresas", value: "Didlaukio g. 78-16, Vilnius", href: null },
              { icon: "📘", label: "Facebook", value: "facebook.com/linksmauodegele", href: "https://www.facebook.com/linksmauodegele" },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-2xl p-5 border border-[#e8d8be] flex gap-4">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="text-xs text-[#7a5c40] font-medium uppercase tracking-wider mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-[#c4622d] font-medium text-sm hover:underline" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[#3d2e1e] font-medium text-sm">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-[#c4622d] rounded-2xl p-5 text-white">
              <div className="text-2xl mb-2">🙋</div>
              <h3 className="font-display font-bold text-lg mb-1">Tapkite savanoriu!</h3>
              <p className="text-sm text-white/80 mb-3">Laikina globa, vežiojimas pas veterinarą, socialiniai tinklai — visi galite prisidėti.</p>
              <a href="mailto:info@linksmauodegele.lt?subject=Noriu%20tapti%20savanoriu" className="inline-block text-sm font-semibold underline">
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
                <p className="font-semibold text-[#1e1a17] text-lg mb-2">Ačiū! Atsidaro jūsų pašto programa.</p>
                <p className="text-[#7a5c40] text-sm mb-6">Jei ji neatsidaro, rašykite tiesiai: <a href="mailto:info@linksmauodegele.lt" className="text-[#c4622d] underline">info@linksmauodegele.lt</a></p>
                <button onClick={() => setStatus("idle")} className="text-sm text-[#c4622d] underline">Siųsti dar vieną</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">
                      Vardas *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jūsų vardas"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">
                      El. paštas *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jusu@pastas.lt"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">
                    Tema
                  </label>
                  <select
                    id="subject"
                    className={inputClass}
                    value={form.subject}
                    onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                  >
                    <option value="">Pasirinkite temą</option>
                    <option value="Noriu įsivaikinti">Noriu įsivaikinti</option>
                    <option value="Noriu tapti laikinu globėju">Noriu tapti laikinu globėju</option>
                    <option value="Noriu savanoriauti">Noriu savanoriauti</option>
                    <option value="Noriu paaukoti">Noriu paaukoti</option>
                    <option value="Kita">Kita</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-medium text-[#5c3d1e] uppercase tracking-wider block mb-1.5">
                    Žinutė *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Jūsų žinutė..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Klaida. Bandykite rašyti tiesiai: info@linksmauodegele.lt</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {status === "sending" ? "Siunčiama..." : "📨 Siųsti žinutę"}
                </button>
                <p className="text-xs text-[#7a5c40] text-center">
                  Arba rašykite tiesiai: <a href="mailto:info@linksmauodegele.lt" className="text-[#c4622d] underline">info@linksmauodegele.lt</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
