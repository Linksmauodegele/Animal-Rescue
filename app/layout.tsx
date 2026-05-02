import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5ede0",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://linksmauodegele.lt"),
  title: {
    default: "Linksma Uodegėlė - Gyvūnų prieglauda Vilniuje",
    template: "%s | Linksma Uodegėlė",
  },
  description:
    "VSI Linksma uodegele - nevyriausybine gyvunu prieglauda Vilniuje, suteikianti laikina globa suzeistu ir beglobiu suniu bei kaciu. Ieskome namu kiekvienam globotiniui.",
  keywords: [
    "gyvūnų prieglauda",
    "šunų prieglauda Vilnius",
    "kačių prieglauda",
    "linksma uodegėlė",
    "įsivaikinti šunį",
    "įsivaikinti katę",
    "beglobiai gyvūnai",
    "savanoriai gyvūnų globa",
  ],
  authors: [{ name: "VšĮ Linksma uodegėlė" }],
  creator: "VšĮ Linksma uodegėlė",
  publisher: "VšĮ Linksma uodegėlė",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "https://linksmauodegele.lt",
    siteName: "Linksma Uodegėlė",
    title: "Linksma Uodegėlė - Gyvūnų prieglauda Vilniuje",
    description:
      "Keiskim nuskriaustų gyvūnų likimus kartu. Laikina globa, gydymas, tikri namai.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linksma Uodegėlė - Gyvūnų prieglauda Vilniuje",
    description: "Keiskim nuskriaustų gyvūnų likimus kartu.",
  },
  alternates: { canonical: "https://linksmauodegele.lt" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AnimalShelter",
              name: "VšĮ Linksma uodegėlė",
              description:
                "Nevyriausybinė gyvūnų prieglauda, suteikianti laikiną globą sužeistiems ir beglobiams gyvūnams.",
              url: "https://linksmauodegele.lt",
              email: "info@linksmauodegele.lt",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Didlaukio g. 78-16",
                addressLocality: "Vilnius",
                addressCountry: "LT",
              },
              sameAs: ["https://www.facebook.com/linksmauodegele"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
