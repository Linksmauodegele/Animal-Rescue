import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Finansinė parama – Linksma uodegėlė",
  description: "Paremkite mūsų veiklą finansiškai per PayPal, Contribee arba bankiniu pavedimu.",
};

export default function FinansinePage() {
  return (
    <PageWrapper>
      <section
        className="min-h-screen py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #2d5a27 0%, #1e3d1a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
            <path d="M-100,300 Q200,100 500,300 Q800,500 1100,200 Q1300,100 1540,300 L1540,600 L-100,600Z" fill="white" />
          </svg>
        </div>
        <div className="absolute top-12 left-12 opacity-10 text-white text-4xl">🐾</div>
        <div className="absolute bottom-12 right-12 opacity-10 text-white text-4xl">🐾</div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <p className="section-label mb-4" style={{ color: "#8aab7a" }}>Prisidėkite</p>
          <h1 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white mb-6 leading-snug">
            Jūsų parama keičia<br />
            <em className="italic text-[#c9973a]">gyvūnų likimus</em>
          </h1>
          <p className="text-[#b5ccaa] max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
            Mūsų veikla išlaikoma <strong className="text-white">tik iš gerų žmonių aukų</strong>. Kiekvienas euras paskiriamas tiesiai gyvūnų gydymui, globai ir priežiūrai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { label: "Veterinarija", icon: "💊", desc: "Gydymas ir skiepai" },
              { label: "Maistas ir priežiūra", icon: "🍖", desc: "Kasdienė globa" },
              { label: "Laikina globa", icon: "🏠", desc: "Savanorių šeimos" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white border border-white/10">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold text-white mb-1">{item.label}</div>
                <div className="text-sm text-[#b5ccaa]">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=YRY662EAYBHLC"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-[#1e1a17] transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#FFD700" }}
              rel="noopener noreferrer"
              aria-label="Paremti per PayPal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#003087">
                <path d="M7.144 19.532l1.049-6.615H5.049L6.993 1.5h7.905c2.31 0 3.894.815 4.543 2.394.39.955.474 1.876.263 2.882-.028.136-.059.273-.094.41l-.006.018v.496l1.033.582.004.003a4.1 4.1 0 011.046 1.056c.41.576.658 1.268.658 2.103 0 .71-.13 1.384-.408 1.98-.275.593-.672 1.105-1.171 1.53-.88.75-1.966 1.118-3.208 1.118h-.777l-.65 4.1H12.18l.644-4.1H10.06l-.643 4.1H7.144z"/>
              </svg>
              PayPal parama
            </a>
            <a
              href="https://contribee.com/linksma-uodegele"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "#c4622d" }}
              rel="noopener noreferrer"
              aria-label="Paremti per Contribee"
            >
              ♥ Contribee parama
            </a>
          </div>

          <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto">
            <p className="text-[#8aab7a] text-sm font-semibold uppercase tracking-wider mb-3">Bankiniu pavedimu</p>
            <p className="text-white font-semibold">VšĮ Linksma uodegėlė</p>
            <p className="text-[#b5ccaa] text-sm mt-1">Įmonės kodas: <span className="text-white font-mono">306212187</span></p>
            <p className="text-[#b5ccaa] text-sm mt-1">Atsiskaitomoji sąskaita:</p>
            <p className="text-[#c9973a] font-mono text-base mt-1 font-bold tracking-wide">LT237044090104254458</p>
            <p className="text-[#8aab7a] text-xs mt-1">(SEB)</p>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#8aab7a]">
              Paskirtis: Auka / FR0512 forma: paieškos laukelyje įrašykite<br/>
              VšĮ „Linksma uodegėlė" identifikacinį numerį – <span className="text-white font-mono">306212187</span>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
