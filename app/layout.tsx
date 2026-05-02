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
    default: "Linksma Uodegėlė – Gyvūnų prieglauda Vilniuje | Įsivaikink šunį ar katę",
    template: "%s | Linksma Uodegėlė – Gyvūnų prieglauda",
  },
  description:
    "VšĮ Linksma Uodegėlė – nevyriausybinė gyvūnų prieglauda Vilniuje nuo 2018 m. Suteikiame laikiną globą sužeistiems ir beglobiams šunims bei katėms. Ieškome mylinčių namų kiekvienam globotiniui. Įsivaikink šiandien!",
  keywords: [
    "gyvūnų prieglauda Vilnius",
    "šunų prieglauda Vilnius",
    "kačių prieglauda Vilnius",
    "linksma uodegėlė",
    "įsivaikinti šunį Vilnius",
    "įsivaikinti katę Vilnius",
    "beglobiai gyvūnai Lietuva",
    "laikina globa gyvūnams",
    "savanoriai gyvūnų globa",
    "gyvūnų prieglauda Lietuva",
    "šunų adopcija",
    "kačių adopcija",
    "VšĮ gyvūnų prieglauda",
    "gyvūnų globa Vilnius",
    "paremti gyvūnus",
  ],
  authors: [{ name: "VšĮ Linksma uodegėlė", url: "https://linksmauodegele.lt" }],
  creator: "VšĮ Linksma uodegėlė",
  publisher: "VšĮ Linksma uodegėlė",
  category: "Animal Shelter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    url: "https://linksmauodegele.lt",
    siteName: "Linksma Uodegėlė",
    title: "Linksma Uodegėlė – Gyvūnų prieglauda Vilniuje",
    description:
      "Suteikiame laikiną globą sužeistiems ir beglobiams gyvūnams. Laikina globa, gydymas, tikri namai. Įsivaikink šiandien!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Linksma Uodegėlė – Gyvūnų prieglauda Vilniuje",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linksma Uodegėlė – Gyvūnų prieglauda Vilniuje",
    description: "Suteikiame laikiną globą sužeistiems gyvūnams. Įsivaikink šiandien!",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://linksmauodegele.lt",
    languages: { "lt-LT": "https://linksmauodegele.lt" },
  },
  verification: {
    google: "", // add Google Search Console verification code here
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
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
              alternateName: "Linksma Uodegėlė",
              description:
                "Nevyriausybinė gyvūnų prieglauda, suteikianti laikiną globą sužeistiems ir beglobiams gyvūnams Vilniuje nuo 2018 m.",
              url: "https://linksmauodegele.lt",
              email: "info@linksmauodegele.lt",
              telephone: "+370658903000",
              foundingDate: "2018",
              logo: "https://linksmauodegele.lt/logo-new.png",
              image: "https://linksmauodegele.lt/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Didlaukio g. 80A",
                addressLocality: "Vilnius",
                addressCountry: "LT",
                addressRegion: "Vilniaus apskritis",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 54.7251,
                longitude: 25.2613,
              },
              sameAs: [
                "https://www.facebook.com/linksmauodegele",
              ],
              openingHoursSpecification: [],
              nonprofitStatus: "Nonprofit501c3",
              knowsAbout: ["šunų globa", "kačių globa", "gyvūnų adopcija", "laikina globa"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
