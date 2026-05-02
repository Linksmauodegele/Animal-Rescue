"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

type Post = {
  id: string; title: string; slug: string; excerpt: string;
  content: string; cover_image_url: string; published_at: string;
};

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
      <main className="min-h-screen bg-[#f8f0e3] pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <a href="/naujienos" className="text-[#c4622d] hover:underline text-sm mb-8 block">← Visos naujienos</a>
          {loading ? (
            <div className="text-center py-16 text-[#7a5c40]">Kraunama...</div>
          ) : !post ? (
            <div className="text-center py-16 text-[#7a5c40]">Straipsnis nerastas.</div>
          ) : (
            <article className="bg-white rounded-3xl overflow-hidden border border-[#e8d8be] shadow-sm">
              {post.cover_image_url && (
                <img src={post.cover_image_url} className="w-full h-64 object-cover" />
              )}
              <div className="p-10">
                <p className="text-xs text-[#7a5c40] mb-3">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("lt-LT", { year: "numeric", month: "long", day: "numeric" }) : ""}
                </p>
                <h1 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-[#1e1a17] mb-6 leading-snug">{post.title}</h1>
                <div className="text-[#5c3d1e] leading-relaxed prose prose-stone max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
