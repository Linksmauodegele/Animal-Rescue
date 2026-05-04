"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_FOOTER = {
  phone: "+370 658 90300",
  email: "info@linksmauodegele.lt",
  address_post: "Didlaukio g. 78-16, Vilnius",
  address_cat_house: "Ateities g. 25B, Vilnius (Tavo Katino svetainė – kačių namai)",
  facebook_url: "https://www.facebook.com/linksmauodegele",
  instagram_url: "https://www.instagram.com/linksma.uodegele",
  tiktok_url: "https://www.tiktok.com/@vsi.linksmauodegele",
  company_code: "306212187",
  description: "Nevyriausybinė organizacija, kuri nuo 2018 m. keičia nuskriaustų gyvūnų likimus Vilniuje.",
  nav_links: [
    { href: "/gyvunai", label: "Globotiniai" },
    { href: "/apie", label: "Apie mus" },
    { href: "/parama", label: "Paremti" },
    { href: "/parama/daiktai", label: "Parama daiktais" },
    { href: "/parama/isigyk", label: "Įsigyk sau" },
    { href: "/naujienos", label: "Naujienos" },
    { href: "/kontaktai", label: "Kontaktai" },
  ],
};

export default function Footer() {
  const [footer, setFooter] = useState(DEFAULT_FOOTER);

  useEffect(() => {
    async function fetchFooter() {
      const { data } = await supabase.from("footer_settings").select("*").limit(1).single();
      if (data) {
        setFooter({
          ...DEFAULT_FOOTER,
          ...data,
          instagram_url: data.instagram_url ?? DEFAULT_FOOTER.instagram_url,
          tiktok_url: data.tiktok_url ?? DEFAULT_FOOTER.tiktok_url,
          nav_links: typeof data.nav_links === "string" ? JSON.parse(data.nav_links) : (data.nav_links ?? DEFAULT_FOOTER.nav_links),
        });
      }
    }
    fetchFooter();
  }, []);

  return (
    <footer className="bg-[#1e1a17] text-[#b0946a] py-14" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">Linksma Uodegėlė</div>
                <div className="text-xs text-[#7a5c40] mt-0.5">VšĮ · Gyvūnų prieglauda</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{footer.description}</p>
            <div className="flex gap-3 mt-4">
              <a href={footer.facebook_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: "#1877F2" }} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
              {footer.instagram_url && (
                <a href={footer.instagram_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
                  aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {footer.tiktok_url && (
                <a href={footer.tiktok_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: "#010101" }} aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigacija</h3>
            <ul className="space-y-2 text-sm">
              {footer.nav_links.map((l: { href: string; label: string }) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kontaktai</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">Telefonas</span>
                <a href={`tel:${footer.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{footer.phone}</a>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">El. paštas</span>
                <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors">{footer.email}</a>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">Registracijos adresas</span>
                <span>{footer.address_post}</span>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">Kačių namai</span>
                <span>{footer.address_cat_house || "Ateities g. 25B, Vilnius"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#30261e] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© {new Date().getFullYear()} VšĮ Linksma uodegėlė · Visos teisės saugomos</p>
          <p className="text-xs text-[#5c3d1e]">Įmonės kodas: {footer.company_code} · Vilnius, Lietuva</p>
          <a href="https://sweetnet.lt" target="_blank" rel="noopener noreferrer" className="text-xs text-[#b0946a] hover:text-white transition-colors font-semibold">⚡ Sukūrė sweetnet.lt</a>
        </div>
      </div>
    </footer>
  );
}
