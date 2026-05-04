"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

type Post = {
  id: string; title: string; slug: string; excerpt: string;
  content: string; cover_image_url: string; video_url: string; published_at: string;
};

function getYoutubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m?.[1] ?? null;
}

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single()
      .then(({ data }) => { if (data) setPost(data); setLoading(false); });
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5ede0] pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <a href="/naujienos"
            className="inline-flex items-center gap-1.5 text-sm text-[#c4622d] hover:text-[#a84e22] font-medium mb-8 transition-colors">
            ← Visos naujienos
          </a>

          {loading ? (
            <div className="text-center py-24 text-[#7a5c40]">Kraunama...</div>
          ) : !post ? (
            <div className="text-center py-24 text-[#7a5c40]">Straipsnis nerastas.</div>
          ) : (
            <article>
              {/* Cover image */}
              {post.cover_image_url && (
                <div className="rounded-2xl overflow-hidden mb-6 border border-[#e8d8be] shadow-sm"
                  style={{ maxHeight: "380px" }}>
                  <img src={post.cover_image_url} alt={post.title}
                    className="w-full object-cover" style={{ maxHeight: "380px" }} />
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                {post.published_at && (
                  <p className="text-xs font-semibold text-[#b0946a] uppercase tracking-wider mb-3">
                    {new Date(post.published_at).toLocaleDateString("lt-LT", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                )}
                <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-[#1e1a17] leading-tight mb-4">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-lg text-[#7a5c40] leading-relaxed border-l-4 border-[#c4622d] pl-4">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Video (only if no content or explicitly added) */}
              {post.video_url && (() => {
                const ytId = getYoutubeId(post.video_url);
                return (
                  <div className="rounded-2xl overflow-hidden mb-8 border border-[#e8d8be] shadow-sm">
                    {ytId ? (
                      <div className="aspect-video">
                        <iframe className="w-full h-full"
                          src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                          title={post.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen />
                      </div>
                    ) : (
                      <video src={post.video_url} controls className="w-full" />
                    )}
                  </div>
                );
              })()}

              {/* Content */}
              {post.content && (
                <div className="bg-white rounded-2xl p-8 border border-[#e8d8be] shadow-sm">
                  <div className="prose prose-stone max-w-none text-[#3d2e1e] leading-relaxed"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: "1.8",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              )}

              {/* Footer nav */}
              <div className="mt-10 pt-8 border-t border-[#e8d8be]">
                <a href="/naujienos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#c4622d] text-white font-semibold text-sm hover:bg-[#a84e22] transition-colors">
                  ← Grįžti į naujienas
                </a>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
