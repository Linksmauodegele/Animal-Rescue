"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  published_at: string;
};

const COLORS = ["#fde8cc", "#d4e8d0", "#e8d4f0", "#d0e4f8", "#f8e8d0"];
const EMOJIS = ["🐾", "🐕", "🐈", "🎉", "💛"];

export default function BlogSection({ fullPage = false }: { fullPage?: boolean }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase.from("posts").select("id,title,slug,excerpt,cover_image_url,published_at")
      .eq("published", true).order("published_at", { ascending: false }).limit(fullPage ? 100 : 3)
      .then(({ data }) => { if (data) setPosts(data); });
  }, []);

  return (
    <section id="naujienos" className="py-24 bg-[#f8f0e3]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Mūsų naujienos</p>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#1e1a17]">
              Istorijos ir <em className="italic text-[#c4622d]">įvykiai</em>
            </h2>
          </div>
          <a href="/naujienos" className="btn-outline text-sm shrink-0">Visos naujienos →</a>
        </div>

        {/* Featured YouTube video */}
        <div className="rounded-3xl overflow-hidden mb-8 relative shadow-lg border border-[#e8d8be]"
          style={{ background: "linear-gradient(135deg, #1e1a17 0%, #2d1e10 100%)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 aspect-video relative">
              <iframe className="w-full h-full"
                src="https://www.youtube.com/embed/xaIAW_JFEdc?start=4&rel=0&modestbranding=1"
                title="Linksma uodegėlė — vaizdo įrašas"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
            <div className="lg:col-span-2 p-8 flex flex-col justify-center">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#c4622d]/20 text-[#f0a060] border border-[#c4622d]/30 mb-4 w-fit">🎬 Video</span>
              <h3 className="font-display text-2xl font-bold text-white mb-3 leading-snug">Kas mes esame?</h3>
              <p className="text-[#c0a080] text-sm leading-relaxed mb-6">
                Pažiūrėkite, kaip kasdien dirbame, kad kiekvienas gyvūnas surastų mylintį namus.
              </p>
              <a href="https://www.youtube.com/watch?v=xaIAW_JFEdc" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#f0a060] hover:text-[#fdc890] transition-colors">
                Žiūrėti YouTube →
              </a>
              <p className="text-[#7a5c60] text-xs mt-6">
                🎥 Už sumontuotą video dėkojame <span className="text-[#c0a080] font-medium">Valdemar Kviatkovskij</span>
              </p>
            </div>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article key={post.id}
                className="card-hover rounded-2xl overflow-hidden bg-white border border-[#e8d8be] opacity-0 animate-slide-up"
                style={{ animationDelay: `${i * 0.12}s`, animationFillMode: "forwards" }}>
                <div className="h-32 relative flex items-center justify-center text-5xl overflow-hidden"
                  style={{ background: COLORS[i % COLORS.length] }}>
                  {post.cover_image_url
                    ? <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    : EMOJIS[i % EMOJIS.length]}
                </div>
                <div className="p-6">
                  <p className="text-xs text-[#7a5c40] mb-2">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString("lt-LT", { year: "numeric", month: "long", day: "numeric" }) : ""}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1e1a17] mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-[#7a5c40] leading-relaxed mb-4">{post.excerpt}</p>
                  <a href={`/naujienos/${post.slug}`} className="text-sm font-semibold text-[#c4622d] hover:text-[#9e4a1e] transition-colors">
                    Skaityti daugiau →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
