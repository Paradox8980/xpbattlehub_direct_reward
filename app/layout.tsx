import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleAds from "@/lib/GoogleAds";

const dosis = Dosis({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Games",
  description: "Games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* <GoogleAds /> */}
      </head>
      <body
        className={`${dosis.variable} antialiased flex justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
