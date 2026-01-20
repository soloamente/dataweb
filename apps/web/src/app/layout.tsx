import "../index.css";

import type { Metadata } from "next";

import localFont from "next/font/local";
import Header from "@/components/header";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
import ReactLenis from "lenis/react";
import { Inter } from "next/font/google";

const sfProRounded = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Ultralight.otf",
      weight: "100",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Thin.otf",
      weight: "200",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Light.otf",
      weight: "300",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Regular.otf",
      weight: "400",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Semibold.otf",
      weight: "600",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Bold.otf",
      weight: "700",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Heavy.otf",
      weight: "800",
    },
    {
      path: "../fonts/SF_Pro_Rounded/SF-Pro-Rounded-Black.otf",
      weight: "900",
    },
  ],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DatwebGroup System",
  description: "DatwebGroup System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sfProRounded.variable} ${inter.variable} font-inter`}>
      <body className="antialiased">
      <ReactLenis
              root
              options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
            >
        <Providers>
          <div className="grid grid-rows-[auto_1fr] min-h-svh isolate">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>  
        </ReactLenis>
      </body>
    </html>
  );
}
