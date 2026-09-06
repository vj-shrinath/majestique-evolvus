import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://majestique-towers.com"),
  title: "Majestique Evolvus | 3 & 4 BHK Luxury Flats in Kharadi, Pune",
  description: "Experience 17 acres of premium living at Majestique Evolvus. Thoughtfully designed 3 BHK & 4 BHK luxury residences for sale in Kharadi with 70+ amenities.",
  keywords: "Majestique Evolvus, 4 bhk luxury flats in pune, 3 bhk for sale in kharadi, 3 bhk ready possession flats in kharadi pune, 3 bhk in kharadi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Majestique Evolvus | 3 & 4 BHK Luxury Flats in Kharadi, Pune",
    description: "Experience 17 acres of premium living at Majestique Evolvus. Thoughtfully designed 3 BHK & 4 BHK luxury residences for sale in Kharadi.",
    url: "https://majestique-towers.com",
    siteName: "Majestique Evolvus",
    images: [
      {
        url: "/asset-2.jpeg", // Replace with an actual hero image URL if available
        width: 1200,
        height: 630,
        alt: "Majestique Evolvus Upper Kharadi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Majestique Evolvus | 3 & 4 BHK Luxury Flats in Kharadi, Pune",
    description: "Experience 17 acres of premium living at Majestique Evolvus. Thoughtfully designed 3 BHK & 4 BHK luxury residences for sale in Kharadi.",
    images: ["/asset-2.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Next.js components for Structured Data (JSON-LD)
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Majestique Evolvus",
    "description": "Premium 3 & 4 BHK luxury residences with a Dolby Atmos Theatre and 70+ amenities in Upper Kharadi.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "url": "https://majestique-towers.com",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "18400000",
        "priceCurrency": "INR"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Upper Kharadi",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the starting price for flats in Majestique Evolvus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The pricing for our premium 3 BHK apartments starts at ₹1.84 Cr, and our spacious 4 BHK residences start at ₹2.65 Cr onwards."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Majestique Evolvus located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The project is strategically located in Central Kharadi, Pune, offering seamless connectivity to Viman Nagar, Kalyani Nagar, and Koregaon Park."
        }
      },
      {
        "@type": "Question",
        "name": "What are the amenities provided?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Residents enjoy exclusive access to 70+ modern luxury lifestyle amenities, including a Grand Clubhouse, Dolby Atmos Theatre, Box Cricket arena, Twin Squash Courts, Swimming Pool, and a Co-working space."
        }
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
