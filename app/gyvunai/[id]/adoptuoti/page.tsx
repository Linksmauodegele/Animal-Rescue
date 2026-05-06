"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PageWrapper from "@/components/PageWrapper";

const DEFAULT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPsSXRP6s31ugQktpD3WRLhds9jKtdspXJwDBOfyMeCvXVVg/viewform?embedded=true";

type Animal = {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: string;
  breed: string;
  image_url: string;
  gallery_images: string[];
  description: string;
  tags: string[];
  birthday: string;
  shelter_since: string;
  status: string;
};

function calcAge(birthday: string): string {
  if (!birthday) return "";
  const birth = new Date(birthday);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;
  if (totalMonths < 12) return `${totalMonths} mėn.`;
  return `${years} metai`;
}

function calcShelterYears(shelterSince: string): string {
  if (!shelterSince) return "";
  const since = new Date(shelterSince);
  const now = new Date();
  const months = (now.getFullYear() - since.getFullYear()) * 12 + (now.getMonth() - since.getMonth());
  if (months < 1) return "Ką tik atvyko";
  if (months < 12) return `${months} mėn.`;
  const years = Math.floor(months / 12);
  return `${years} m.`;
}

export default function AdoptuotiPage() {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [formUrl, setFormUrl] = useState(DEFAULT_FORM_URL);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("anketa_form_url");
    if (stored) setFormUrl(stored);
  }, []);

  useEffect(() => {
    async function fetchAnimal() {
      const { data } = await supabase.from("animals").select("*").eq("id", id).single();
      if (data) {
        setAnimal(data);
        setActiveImg(data.image_url || null);
      }
      setLoading(false);
    }
    fetchAnimal();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center text-[#7a5c40]">Kraunama...</div>
      </PageWrapper>
    );
  }

  const allImages = animal ? [animal.image_url, ...(animal.gallery_images || [])].filter(Boolean) : [];
  const ageStr = animal?.birthday ? calcAge(animal.birthday) : animal?.age;
  const shelterStr = animal?.shelter_since ? calcShelterYears(animal.shelter_since) : "";

  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-[#f5f0ea]">
        <div className="max-w-3xl mx-auto px-6">

          {animal && (
            <div className="bg-white rounded-3xl border border-[#e8d8be] shadow-sm overflow-hidden mb-10">
              {/* Main image */}
              {activeImg && (
                <div className="w-full overflow-hidden bg-[#f5f0ea]">
                  <img src={activeImg} alt={animal.name} className="w-full h-full object-contain block" />
                </div>
              )}

              {/* Gallery thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
                  {allImages.map((url, i) => (
                    <button key={i} onClick={() => setActiveImg(url)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === url ? "border-[#c4622d]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <img src={url} className="w-full h-full object-cover block" />
                    </button>
                  ))}
                </div>
              )}

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-display text-3xl font-bold text-[#1e1a17]">{animal.name}</h2>
                  <span className="px-3 py-1 bg-[#f8f0e3] rounded-full text-xs text-[#5c3d1e] font-medium">{animal.status}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-[#7a5c40] mb-4">
                  {ageStr && (
                    <div className="flex items-center gap-1.5">
                      <span>🎂</span>
                      <span>{ageStr}</span>
                    </div>
                  )}
                  {shelterStr && (
                    <div className="flex items-center gap-1.5">
                      <span>🏠</span>
                      <span>{shelterStr} prieglaudoje</span>
                    </div>
                  )}
                  {animal.breed && (
                    <div className="flex items-center gap-1.5">
                      <span>🐾</span>
                      <span>{animal.breed}</span>
                    </div>
                  )}
                </div>

                {animal.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {animal.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#f8f0e3] text-[#5c3d1e] border border-[#e8d8be]">{tag}</span>
                    ))}
                  </div>
                )}

                {animal.description && (
                  <p className="text-[#5c3d1e] leading-relaxed text-sm">{animal.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Embedded Google Form */}
          <div className="bg-white rounded-3xl border border-[#e8d8be] shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-2">
              <h3 className="font-display text-xl font-bold text-[#1e1a17] mb-1">Gyvūno norėtojo anketa</h3>
              <p className="text-sm text-[#7a5c40]">Užpildykite anketą ir mes susisieksime su jumis.</p>
            </div>
            <iframe
              src={formUrl}
              width="100%"
              height="2800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full"
            >
              Kraunama...
            </iframe>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
