import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#1e1a17] text-[#b0946a] py-14" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">
                  Linksma Uodegėlė
                </div>
                <div className="text-xs text-[#7a5c40] mt-0.5">
                  VšĮ · Gyvūnų prieglauda
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Nevyriausybinė organizacija, kuri nuo 2018 m. keičia nuskriaustų
              gyvūnų likimus Vilniuje.
            </p>
            <a
              href="https://www.facebook.com/linksmauodegele"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#c4622d] hover:text-[#e07a4a] transition-colors"
            >
              📘 Facebook puslapiukas
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Navigacija
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/gyvunai", label: "Globotiniai" },
                { href: "/apie", label: "Apie mus" },
                { href: "/parama", label: "Paremti" },
                { href: "/parama#daiktai", label: "Parama daiktais" },
                { href: "/parama#isigyk", label: "Įsigyk sau" },
                { href: "/naujienos", label: "Naujienos" },
                { href: "/kontaktai", label: "Kontaktai" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Kontaktai
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">
                  Telefonas
                </span>
                <a
                  href="tel:+37065890300"
                  className="hover:text-white transition-colors"
                >
                  +370 658 90300
                </a>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">
                  El. paštas
                </span>
                <a
                  href="mailto:info@linksmauodegele.lt"
                  className="hover:text-white transition-colors"
                >
                  info@linksmauodegele.lt
                </a>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">
                  Paštomatas
                </span>
                <span>Didlaukio g. 80A, Vilnius</span>
              </li>
              <li>
                <span className="block text-[#7a5c40] text-xs uppercase tracking-wider mb-0.5">
                  Perduoti asmeniškai
                </span>
                <span>Ateities g. 25B, Vilnius</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#30261e] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} VšĮ Linksma uodegėlė · Visos teisės
            saugomos
          </p>
          <p className="text-xs text-[#5c3d1e]">
            Įmonės kodas: 306212187 · Vilnius, Lietuva
          </p>
        </div>
      </div>
    </footer>
  );
}
