"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/gyvunai", label: "Globotiniai" },
  { href: "/rado-namus", label: "Rado namus" },
  { href: "/apie", label: "Apie mus" },
  {
    label: "Parama",
    href: "/parama",
    dropdown: [
      { href: "/parama/finansine", label: "💳 Finansinė parama" },
      { href: "/parama/gpm", label: "📋 Skirkite 1,2% GPM" },
      { href: "/parama/daiktai", label: "📦 Parama daiktais" },
      { href: "/parama/isigyk", label: "🛍️ Įsigyk sau – padėk gyvūnui" },
    ],
  },
  { href: "/naujienos", label: "Naujienos" },
  { href: "/projektai", label: "Projektai" },
  { href: "/kontaktai", label: "Kontaktai" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileParamaOpen, setMobileParamaOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileParamaOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isParamaActive = pathname.startsWith("/parama");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f8f0e3]/95 backdrop-blur-md shadow-sm border-b border-[#e8d8be]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Pagrindinis meniu"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src="/logo-new.png"
            alt="Linksma Uodegėlė logo"
            className="w-10 h-10 object-contain flex-shrink-0"
          />
          <div>
            <div className="font-display font-bold text-[#1e1a17] text-lg leading-none">Linksma</div>
            <div className="font-display italic text-[#c4622d] text-sm leading-none">Uodegėlė</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className={`flex items-center gap-1 font-medium text-sm tracking-wide transition-colors duration-200 ${
                    isParamaActive || dropdownOpen
                      ? "text-[#c4622d]"
                      : "text-[#5c3d1e] hover:text-[#c4622d]"
                  }`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-[#e8d8be] py-2 overflow-hidden">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#e8d8be] rotate-45" />
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-[#5c3d1e] hover:bg-[#f8f0e3] hover:text-[#c4622d] transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`font-medium text-sm tracking-wide transition-colors duration-200 ${
                  isActive(item.href!)
                    ? "text-[#c4622d]"
                    : "text-[#5c3d1e] hover:text-[#c4622d]"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/parama" className="btn-primary text-sm py-2.5 px-6">
            <span>♥</span> Paremti
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Atidaryti meniu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-[#1e1a17] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1e1a17] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1e1a17] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#f8f0e3] border-t border-[#e8d8be] px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileParamaOpen((o) => !o)}
                  className={`w-full flex items-center justify-between font-medium py-3 border-b border-[#e8d8be] ${
                    isParamaActive ? "text-[#c4622d]" : "text-[#5c3d1e]"
                  }`}
                >
                  {item.label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileParamaOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {mobileParamaOpen && (
                  <div className="pl-4 pb-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => { setMenuOpen(false); setMobileParamaOpen(false); }}
                        className="flex items-center gap-2 text-sm text-[#7a5c40] hover:text-[#c4622d] py-2.5 border-b border-[#e8d8be]/60 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`font-medium py-3 border-b border-[#e8d8be] ${
                  isActive(item.href!) ? "text-[#c4622d]" : "text-[#5c3d1e]"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/parama" className="btn-primary mt-3 justify-center">
            ♥ Paremti
          </Link>
        </div>
      )}
    </nav>
  );
}
