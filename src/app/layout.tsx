import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppProviders from "@/components/AppProviders";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const BASE_URL = "https://introalimentar.com";

export const metadata: Metadata = {
  title: "IntroAlimentar — Guía de alimentación complementaria",
  description:
    "Guía completa para la introducción de alimentos sólidos en bebés, basada en las recomendaciones de la AEP y la OMS. Plan semanal, diario, alérgenos y más.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      es: "/?lang=es",
      en: "/?lang=en",
      "pt-br": "/?lang=pt-br",
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "IntroAlimentar — Tu guía de alimentación complementaria",
    description:
      "Plan semanal, diario de comidas, alérgenos y lecciones sobre alimentación complementaria para bebés. Basada en guías AEP, OMS y ESPGHAN.",
    siteName: "IntroAlimentar",
    locale: "es_ES",
    alternateLocale: ["en_US", "pt_BR"],
    images: [
      {
        url: "/icons/icon-512x512.svg",
        width: 512,
        height: 512,
        alt: "IntroAlimentar",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "IntroAlimentar — Alimentación complementaria",
    description:
      "Guía completa para la introducción de alimentos sólidos en bebés. Plan semanal, diario, alérgenos y más.",
    images: ["/icons/icon-512x512.svg"],
  },
  applicationName: "IntroAlimentar",
  appleWebApp: {
    capable: true,
    title: "IntroAlimentar",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.svg",
    apple: "/icons/icon-192x192.svg",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#66BB6A",
};

function JsonLd() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "IntroAlimentar",
    url: BASE_URL,
    description:
      "Guía completa para la introducción de alimentos sólidos en bebés, basada en las recomendaciones de la AEP y la OMS.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    inLanguage: ["es", "en", "pt-BR"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuándo empezar la alimentación complementaria?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La OMS y la AEP recomiendan iniciar la alimentación complementaria alrededor de los 6 meses de edad, cuando el bebé muestra todos los signos de preparación: control de cabeza, pérdida del reflejo de extrusión, coordinación mano-boca e interés activo por la comida.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es el BLW (Baby-Led Weaning)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El BLW permite que el bebé se alimente solo desde el inicio con trozos adaptados a su edad. El bebé decide qué coger, cuánto comer y a qué ritmo. La AEP indica que es seguro cuando se cumplen los signos de preparación.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuáles son los alimentos prohibidos para bebés menores de 12 meses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los principales alimentos a evitar antes de los 12 meses son: miel (riesgo de botulismo), sal, azúcar añadido, leche de vaca como bebida, y exceso de espinacas/acelgas por nitratos. Los frutos secos enteros están prohibidos hasta los 3 años.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
