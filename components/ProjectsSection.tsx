"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  image_url: string;
  active: boolean;
  sort_order: number;
};

export default function ProjectsSection({ fullPage = false }: { fullPage?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setProjects(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-[#f5f0ea] min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Mūsų iniciatyvos</p>
          <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
            Projektai
          </h1>
          <p className="text-[#7a5c40] max-w-xl mx-auto text-lg">
            Aktyvūs projektai ir kampanijos, kuriomis renkame paramą gyvūnų labui.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#7a5c40]">Kraunama...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-[#7a5c40]">
            Šiuo metu aktyvių projektų nėra. Sekite naujienas!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#e8d8be] shadow-sm hover:shadow-md transition-shadow"
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-7">
                  {p.platform && (
                    <span className="text-xs font-semibold text-[#c4622d] uppercase tracking-wider">
                      {p.platform}
                    </span>
                  )}
                  <h2 className="font-display font-bold text-[#1e1a17] text-xl mt-1 mb-3">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="text-[#7a5c40] text-sm leading-relaxed mb-5">
                      {p.description}
                    </p>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
                    >
                      Dalyvauti projekte →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
