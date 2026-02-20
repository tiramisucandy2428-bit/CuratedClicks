import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import TopAdBanner from "@/app/components/TopAdBanner";
import "./globals.css";

const adSenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1603923202565384";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Curated Clicks",
  description: "Curated Clicks luxury train navigation experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopAdBanner />
        {children}
      </body>
    </html>
  );
}
