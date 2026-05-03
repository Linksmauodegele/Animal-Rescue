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
  company_code: "306212187",
  description: "Nevyriausybinė organizacija, kuri nuo 2018 m. keičia nuskriaustų gyvūnų likimus Vilniuje.",
  nav_links: [
    { href: "/gyvunai", label: "Globotiniai" },
    { href: "/apie", label: "Apie mus" },
    { href: "/parama", label: "Paremti" },
    { href: "/parama#daiktai", label: "Parama daiktais" },
    { href: "/parama#isigyk", label: "Įsigyk sau" },
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
          ...data,
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
            <a href={footer.facebook_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#c4622d] hover:text-[#e07a4a] transition-colors">
              📘 Facebook puslapiukas
            </a>
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
