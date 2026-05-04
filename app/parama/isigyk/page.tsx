"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageWrapper from "@/components/PageWrapper";

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  emoji: string;
  color: string;
  image_url?: string;
  display_order: number;
};

export default function IsigykPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("shop_products")
        .select("*")
        .order("display_order");
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <PageWrapper>
      <section className="min-h-screen py-32 bg-[#f5f0ea]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Rankų darbas</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#1e1a17] mb-4">
              Įsigyk sau –{" "}
              <em className="italic text-[#c4622d]">padėk gyvūnui</em>
            </h1>
            <p className="text-[#7a5c40] max-w-2xl mx-auto">
              Mūsų sekėjos Anos rankų darbo mezginiai. Visos sukauptos lėšos
              skiriamos globotinių priežiūrai ir gydymui.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e8d8be] animate-pulse"
                >
                  <div className="h-40 bg-[#f0e6d0]" />
                  <div className="p-5 space-y-2">
                    <div className="h-4 bg-[#f0e6d0] rounded w-3/4" />
                    <div className="h-3 bg-[#f0e6d0] rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : products.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-[#7a5c40]">
                Šiuo metu produktų nėra. Užsukite vėliau!
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e8d8be] hover:shadow-md transition-shadow"
                >
                  <div
                    className="aspect-square w-full flex items-center justify-center overflow-hidden"
                    style={{ background: product.color }}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="text-6xl">{product.emoji}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="font-display font-bold text-[#1e1a17]">
                        {product.title}
                      </h2>
                      <span className="text-[#c4622d] font-bold text-lg ml-2 flex-shrink-0">
                        {product.price}€
                      </span>
                    </div>
                    <p className="text-sm text-[#7a5c40]">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#e8d8be] shadow-sm">
            <div className="text-center mb-6">
              <p className="text-[#1e1a17] font-semibold text-lg">
                Norint įsigyti – skambinkite tel.
              </p>
              <a
                href="tel:+37065890300"
                className="text-[#c4622d] font-bold text-2xl hover:text-[#a84d20] transition-colors"
              >
                +370 658 90300
              </a>
              <p className="text-[#7a5c40] mt-1">arba užpildykite užklausą</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">
                  Vardas
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d]"
                  placeholder="Jūsų vardas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">
                  El. paštas *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d]"
                  placeholder="jusu@pastas.lt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5c3d1e] mb-1">
                  Žinutė *
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8d8be] bg-[#faf7f2] text-[#1e1a17] focus:outline-none focus:ring-2 focus:ring-[#c4622d]/30 focus:border-[#c4622d] resize-none"
                  placeholder="Kurį produktą norėtumėte įsigyti?"
                />
              </div>
              <button
                type="button"
                className="w-full btn-primary justify-center py-3"
              >
                Parašykite mums
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
