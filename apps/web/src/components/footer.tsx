import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative h-[600px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full ">
        <div className="py-8 px-4 md:px-12 h-full gap-2 w-full flex flex-col justify-end">
          <div className="flex justify-center items-end w-full h-full pt-120 pb-20">
            <Image
              src="/images/logos/logo_positivo.png"
              alt="Dataweb"
              width={10000}
              height={1000}
              className="w-auto h-full grayscale opacity-50"
            />
          </div>
          {/* <div className="rounded-full w-full h-px bg-primary/20" /> */}
          {/* Main footer content - single column on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 border-t border-primary/20">
            {/* NotarShare Doc promotional card - hidden on mobile */}
            <div className="bg-primary/20 w-fit h-fit max-w-md items-center p-1.5 pl-3 md:p-2 md:pl-5 rounded-3xl md:rounded-4xl hidden md:flex">
              <div className="flex flex-col gap-1 md:gap-2">
                <h4 className="text-sm md:text-lg text-primary-foreground font-medium leading-none">
                  Nuovo portale NotarShare Doc
                </h4>
                <p className="text-xs md:text-base text-primary-foreground/70 leading-none">
                  Scopri il nostro nuovo portale per la gestione documentale
                </p>
              </div>
              <div
                className="rounded-2xl md:rounded-3xl h-14 w-16 md:h-20 md:w-23 bg-cover shrink-0
               bg-[url('/images/background_home.png')]"
              />
            </div>
            {/* Footer links - 2 columns on mobile, 4 on desktop */}
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
              <div className="flex flex-col gap-3 font-medium leading-none">
                {" "}
                <h2 className="text-primary font-medium leading-none">
                  Azienda
                </h2>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Chi siamo
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Novità
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Eventi
                </Link>
              </div>
              <div className="flex flex-col gap-3 font-medium leading-none">
                {" "}
                <h2 className="text-primary font-medium leading-none">
                  Soluzioni
                </h2>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Notai e studi
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Aziende
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Sviluppo
                </Link>
              </div>
              <div className="flex flex-col gap-3 font-medium leading-none">
                {" "}
                <h2 className="text-primary font-medium leading-none">
                  Contatti
                </h2>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  info@dataweb-srl.it
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  +39 030 8372940
                </Link>
                <Link
                  className="opacity-30 hover:opacity-100 transition-opacity duration-200"
                  href="/"
                >
                  Via Padova, 3 – 25125 BRESCIA (BS)
                </Link>
              </div>
            </div>
          </div>
          {/* Copyright section - stacked on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-center w-full gap-4 md:gap-2 pt-12 font-medium leading-none">
            <div className="flex justify-start items-center gap-2">
              <Image
                src="/images/logos/logo_positivo.png"
                alt="Dataweb"
                width={20}
                height={20}
                className="w-auto h-5 grayscale"
              />
              <p className="text-primary/70 leading-none">
                DatawebSystem Group{" "}
                <span className="text-primary/20">
                  Tutti i diritti riservati © {new Date().getFullYear()}
                </span>
              </p>
            </div>
            <div className="flex justify-start items-center">
              <Link
                href="/"
                className="text-primary/70 hover:text-primary transition-colors duration-200 leading-none"
              >
                Privacy e Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
