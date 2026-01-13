"use client";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import VShapedArrowDown from "./ui/icons/v-shaped-arrow-down";
import Image from "next/image";

// Define menu items structure for each category
const menuItems = {
  info: [
    {
      to: "/info",
      label: "Chi siamo",
      description: "Scopri chi siamo e cosa facciamo.",
    },
    {
      to: "/info/novità",
      label: "Novità",
      description: "Esplora i nostri ultimi progetti.",
    },
    {
      to: "/info/eventi",
      label: "Eventi",
      description:
        "Scopri tutti i prossimi appuntamenti a cui parteciperà DataWeb.",
    },
  ],
  servizi: [
    {
      to: "/servizi/notai-e-studi",
      label: "Soluzioni per notai e studi professionali",
      description:
        "Scopri le nostre soluzioni per notai e studi professionali.",
    },
    {
      to: "/servizi/aziende",
      label: "Soluzioni per aziende private e pubbliche",
      description:
        "Scopri le nostre soluzioni per aziende private e pubbliche.",
    },
    {
      to: "/servizi/sviluppo",
      label: "Sviluppo software, ai e blockchain",
      description:
        "Scopri le nostre soluzioni per sviluppo software, ai e blockchain.",
    },
  ],
  casi_studio: [
    {
      to: "/casi-studio",
      label: "Casi di studio",
      description: "Scopri i nostri casi di studio.",
    },
  ],
} as const;

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const categories = [
    { name: "servizi", label: "Servizi" },
    { name: "casi_studio", label: "Casi Studio" },
    { name: "info", label: "Info" },
  ] as const;

  return (
    <div className="flex fixed px-[40px] py-[30px] top-0 left-0 right-0 z-50 flex-row items-center justify-between">
      <Link href="/" className="text-lg font-medium flex items-center gap-2.5">
        <Image
          src="/images/logos/logo_positivo.png"
          alt="Dataweb"
          width={100}
          height={100}
          className="w-auto h-10"
        />{" "}
        Dataweb
      </Link>

      <nav className="flex gap-2 items-center">
        {categories.map(({ name, label }) => {
          const isOpen = openMenu === name;
          const items = menuItems[name as keyof typeof menuItems];

          return (
            <DropdownMenu
              key={name}
              open={isOpen}
              onOpenChange={(open) => setOpenMenu(open ? name : null)}
            >
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-2.5 leading-none  cursor-pointer text-foreground pl-4 pr-3.5 py-2.75 rounded-full transition-colors",
                      "hover:bg-muted/50",
                      isOpen ? "bg-primary-foreground/50 backdrop-blur-lg" : ""
                    )}
                  >
                    {label}
                    <VShapedArrowDown
                      strokeWidth={2}
                      className={cn(
                        "transition-transform duration-300 text-foreground/60 ease-out",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                }
              />
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className={cn(
                  "p-6 w-auto min-w-[600px] rounded-lg shadow-lg",
                  name === "info" && "min-w-[800px]"
                )}
              >
                {name === "info" ? (
                  // Mega-menu layout for Info: two columns
                  <div className="grid grid-cols-[1fr_1fr] gap-6">
                    {/* Left column: 3 cards */}
                    <div className="flex flex-col gap-3">
                      {items.map((item) => (
                        <Link
                          key={item.to}
                          href={item.to as any}
                          onClick={() => setOpenMenu(null)}
                          className="block"
                        >
                          <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer rounded-lg border-0 shadow-sm">
                            <CardHeader className="px-4 py-3">
                              <CardTitle className="text-sm font-semibold text-foreground">
                                {item.label}
                              </CardTitle>
                              <CardDescription className="text-xs text-muted-foreground mt-1">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {/* Right column: 1 larger card with image */}
                    <div>
                      <Link
                        href={"/info" as any}
                        onClick={() => setOpenMenu(null)}
                        className="block h-full"
                      >
                        <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer h-full rounded-lg border-0 shadow-sm">
                          <div className="relative w-full h-48 bg-muted/30 rounded-t-lg mb-4 overflow-hidden">
                            {/* Placeholder for image - replace with actual image */}
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                              [Immagine Chi siamo]
                            </div>
                          </div>
                          <CardHeader className="px-4 py-3">
                            <CardTitle className="text-sm font-semibold text-foreground">
                              Chi siamo
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground mt-1">
                              Scopri chi siamo e cosa facciamo.
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    </div>
                  </div>
                ) : (
                  // Standard layout for other menus: single column
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <Link
                        key={item.to}
                        href={item.to as any}
                        onClick={() => setOpenMenu(null)}
                        className="block"
                      >
                        <Card className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer rounded-lg border-0 shadow-sm">
                          <CardHeader className="px-4 py-3">
                            <CardTitle className="text-sm font-semibold text-foreground">
                              {item.label}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </nav>
      <div className="flex items-center gap-2">
        <button className="flex px-5 py-2.75 cursor-pointer leading-none bg-primary-foreground text-primary rounded-full font-lg">
          Parla con noi
        </button>
      </div>
    </div>
  );
}
