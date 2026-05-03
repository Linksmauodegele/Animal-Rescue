"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const sections = [
    {
      group: "Turinys",
      items: [
        { href: "/admin/animals", icon: "🐾", label: "Globotiniai", desc: "Pridėti, redaguoti, šalinti gyvūnus" },
        { href: "/admin/rado-namus", icon: "🏠", label: "Rado namus", desc: "Įvaikintų gyvūnų sąrašas" },
        { href: "/admin/apie", icon: "ℹ️", label: "Apie mus", desc: "Redaguoti tekstą ir vertybes" },
        { href: "/admin/blog", icon: "📝", label: "Naujienos / Tinklaraštis", desc: "Rašyti ir valdyti straipsnius" },
      ],
    },
    {
      group: "Parama",
      items: [
        { href: "/admin/isigyk", icon: "🛍️", label: "Įsigyk sau – padėk gyvūnui", desc: "Valdyti rankų darbo produktus" },
      ],
    },
    {
      group: "Medija ir išvaizda",
      items: [
        { href: "/admin/hero", icon: "🏠", label: "Titulinis tekstas", desc: "Redaguoti antraštę, aprašymą, mygtukus" },
        { href: "/admin/video", icon: "🎬", label: "Titulinis vaizdo įrašas", desc: "Keisti YouTube nuorodą" },
        { href: "/admin/anketa", icon: "📋", label: "Adopcijos anketa", desc: "Keisti Google Forms nuorodą" },
        { href: "/admin/partners", icon: "🤝", label: "Partneriai", desc: "Valdyti partnerių logotipus ir nuorodas" },
        { href: "/admin/remejai", icon: "💛", label: "Rėmėjai", desc: "Valdyti rėmėjų sąrašą" },
        { href: "/admin/footer", icon: "🦶", label: "Puslapio apačia", desc: "Redaguoti kontaktus, adresą, nuorodas" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f0e3] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#e8d8be] max-w-lg w-full">
        <div className="text-center mb-8">
          <svg viewBox="0 0 40 40" className="w-14 h-14 mx-auto mb-4">
            <circle cx="20" cy="20" r="19" fill="#c4622d" />
            <ellipse cx="20" cy="21" rx="10" ry="9" fill="#f5ede0" />
            <ellipse cx="15" cy="13" rx="4" ry="6" fill="#c4622d" transform="rotate(-15 15 13)" />
            <ellipse cx="25" cy="13" rx="4" ry="6" fill="#c4622d" transform="rotate(15 25 13)" />
            <circle cx="17" cy="20" r="1.5" fill="#3d2e1e" />
            <circle cx="23" cy="20" r="1.5" fill="#3d2e1e" />
          </svg>
          <h1 className="font-display text-2xl font-bold text-[#1e1a17]">Valdymo skydelis</h1>
          <p className="text-[#7a5c40] text-sm mt-1">Linksma uodegėlė · Admin</p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.group}>
              <p className="text-[10px] font-bold text-[#7a5c40] uppercase tracking-widest mb-2 px-1">{section.group}</p>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[#e8d8be] hover:border-[#c4622d] hover:bg-[#fde8cc] transition-all group"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1e1a17] text-sm group-hover:text-[#c4622d]">{item.label}</div>
                      <div className="text-xs text-[#7a5c40] truncate">{item.desc}</div>
                    </div>
                    <span className="text-[#c4622d] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-[#e8d8be] flex items-center justify-between">
          <a href="/" className="text-sm text-[#c4622d] hover:underline">← Grįžti į svetainę</a>
          <button onClick={handleLogout} className="text-sm text-[#7a5c40] hover:text-red-500 transition-colors">
            Atsijungti →
          </button>
        </div>
      </div>
    </div>
  );
}
