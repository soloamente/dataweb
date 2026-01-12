import type { Metadata } from "next";

import localFont from "next/font/local";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const sfProRounded = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Ultralight.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Thin.otf",
      weight: "200",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Semibold.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Heavy.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Black.otf",
      weight: "900",
    },
  ],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sfProRounded.variable} antialiased`}
      >
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh isolate">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
