import type { Metadata } from "next"

import VolpioLogotype from "@/assets/Volpio_logotype.svg"

import "styles/tailwind.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"),
  title: "Volpio",
  description: "L'intelligence en mouvement",
  icons: {
    icon: VolpioLogotype.src,
    apple: VolpioLogotype.src,
  },
  openGraph: {
    title: "Volpio",
    description: "L'intelligence en mouvement",
    images: [VolpioLogotype.src],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volpio",
    description: "L'intelligence en mouvement",
    images: [VolpioLogotype.src],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
