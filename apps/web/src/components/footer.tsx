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
        <div className="py-8 px-12 h-full gap-2 w-full flex flex-col justify-end">
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
          <div className="grid grid-cols-2 gap-4 pt-12 border-t border-primary/20">
            <div className="bg-primary/20 w-fit h-fit max-w-md items-center p-2 pl-5 rounded-4xl flex">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg text-primary-foreground font-medium leading-none">
                  Nuovo portale NotarShare Doc
                </h4>
                <p className="text-primary-foreground/70 leading-none">
                  Scopri il nostro nuovo portale per la gestione documentale
                </p>
              </div>
              <div
                className="rounded-3xl h-20 w-23 bg-cover
               bg-[url('/images/background_home.png')]"
              />
            </div>
            <div className="grid w-full grid-cols-4 gap-4">
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
          {/* Copyright section - placed outside the grid to ensure visibility */}
          <div className="grid grid-cols-2 justify-start items-center w-full gap-2 pt-12 font-medium leading-none">
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
