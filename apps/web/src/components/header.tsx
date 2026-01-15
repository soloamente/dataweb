"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  // State for desktop dropdown menus
  const [desktopOpenMenu, setDesktopOpenMenu] = useState<string | null>(null);
  // State for mobile side panel visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for which category is expanded inside the mobile side panel
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(
    null
  );
  // State to track if user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // Ref to store timeout for closing dropdown on hover
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    { name: "servizi", label: "Servizi" },
    { name: "info", label: "Info" },
  ] as const;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Track scroll position to conditionally apply backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled more than 0 pixels
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle hover enter for desktop dropdowns
  const handleHoverEnter = (menuName: string) => {
    // Clear any pending close timeout immediately
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Immediately open the new menu (this will close any previously open menu)
    setDesktopOpenMenu(menuName);
  };

  // Handle hover leave for desktop dropdowns
  const handleHoverLeave = (menuName: string) => {
    // Only close if we're leaving the currently open menu
    // This prevents closing when moving between nav items
    if (desktopOpenMenu === menuName) {
      // Add a small delay before closing to allow moving to the dropdown content
      closeTimeoutRef.current = setTimeout(() => {
        // Double-check that this menu is still the open one before closing
        // (in case user hovered over another nav item during the delay)
        if (desktopOpenMenu === menuName) {
          setDesktopOpenMenu(null);
        }
        closeTimeoutRef.current = null;
      }, 150); // 150ms delay to allow smooth transition to dropdown content
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Rimuove il focus dal primo elemento quando il menu si apre tramite hover
  // Questo previene l'outline visibile quando si naviga con il mouse
  useEffect(() => {
    if (desktopOpenMenu) {
      // Usa multiple tentativi per catturare il focus che Base UI potrebbe impostare in modo asincrono
      const removeFocus = () => {
        const dropdownContent = document.querySelector(
          `[data-slot="dropdown-menu-content"]`
        );
        if (dropdownContent) {
          const firstLink = dropdownContent.querySelector("a");
          const activeElement = document.activeElement;

          // Se il primo link o qualsiasi link nel dropdown ha il focus, rimuovilo
          if (
            (firstLink && document.activeElement === firstLink) ||
            (activeElement &&
              activeElement.tagName === "A" &&
              activeElement.closest('[data-slot="dropdown-menu-content"]'))
          ) {
            (activeElement as HTMLElement)?.blur();
            firstLink?.blur();
          }
        }
      };

      // Prova immediatamente e poi con alcuni delay per catturare il focus asincrono
      removeFocus();
      const timeout1 = setTimeout(removeFocus, 0);
      const timeout2 = setTimeout(removeFocus, 10);
      const timeout3 = setTimeout(removeFocus, 50);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [desktopOpenMenu]);

  // Close mobile menu when clicking outside or on a link
  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setDesktopOpenMenu(null);
    setMobileOpenCategory(null);
  };

  return (
    <div className="p-4 fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div
        className={cn(
          "bg-transparent rounded-full text-primary-foreground flex w-2/2 px-1 md:px-2 py-1 md:py-2 flex-row items-center justify-between transition-all duration-200",
          isScrolled && "backdrop-blur-sm"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-medium flex items-center gap-2.5 z-50"
        >
          <Image
            src="/images/logos/logo_positivo.png"
            alt="Dataweb"
            width={100}
            height={100}
            className="w-auto h-8 md:h-10"
          />
          <span className="hidden sm:inline">Dataweb</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex gap-2 items-center ">
          {/* Servizi dropdown */}
          {(() => {
            const name = "servizi";
            const label = "Servizi";
            const isOpen = desktopOpenMenu === name;
            const items = menuItems[name as keyof typeof menuItems];

            return (
              <div
                key={name}
                onMouseEnter={() => handleHoverEnter(name)}
                onMouseLeave={() => handleHoverLeave(name)}
                className="relative "
              >
                <DropdownMenu
                  open={isOpen}
                  onOpenChange={(open) => {
                    if (!open) {
                      setDesktopOpenMenu(null);
                    }
                  }}
                >
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        className={cn(
                          "flex items-center  gap-2.5 leading-none cursor-pointer text-primary-foreground pl-4 pr-3.5 py-2.75 rounded-full transition-colors",
                          "hover:bg-muted/50",
                          isOpen
                            ? "bg-primary-foreground/50 backdrop-blur-lg"
                            : ""
                        )}
                      >
                        {label}
                        <VShapedArrowDown
                          strokeWidth={2}
                          className={cn(
                            "transition-transform duration-300 text-primary-foreground/60 ease-out",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                    }
                  />
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    onMouseEnter={() => handleHoverEnter(name)}
                    onMouseLeave={() => handleHoverLeave(name)}
                    className="p-2.5 w-auto min-w-[600px] rounded-2xl bg-primary-foreground/70 backdrop-blur-lg shadow-lg"
                  >
                    <div className="flex flex-col gap-2.5">
                      {items.map((item) => (
                        <Link
                          key={item.to}
                          href={item.to as any}
                          onClick={() => setDesktopOpenMenu(null)}
                          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-lg"
                        >
                          <div className="bg-primary-foreground/25 flex flex-col  p-2.5 hover:bg-primary-foreground/70 transition-colors cursor-pointer rounded-lg ring-0 shadow-none duration-300">
                            <div>
                              <h2 className="text-lg font-medium text-foreground">
                                {item.label}
                              </h2>
                              <p className="text-base text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })()}

          {/* Casi Studio as a simple link */}
          <Link
            href="/casi-studio"
            className="flex items-center gap-2.5 leading-none cursor-pointer text-foreground-primary pl-4 pr-4 py-2.75 rounded-full transition-colors hover:bg-muted/50"
          >
            Casi Studio
          </Link>

          {/* Info dropdown */}
          {(() => {
            const name = "info";
            const label = "Info";
            const isOpen = desktopOpenMenu === name;
            const items = menuItems[name as keyof typeof menuItems];

            return (
              <div
                key={name}
                onMouseEnter={() => handleHoverEnter(name)}
                onMouseLeave={() => handleHoverLeave(name)}
                className="relative"
              >
                <DropdownMenu
                  open={isOpen}
                  onOpenChange={(open) => {
                    if (!open) {
                      setDesktopOpenMenu(null);
                    }
                  }}
                >
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-2.5 leading-none cursor-pointer text-foreground-primary pl-4 pr-3.5 py-2.75 rounded-full transition-colors",
                          "hover:bg-muted/50",
                          isOpen
                            ? "bg-primary-foreground/50 backdrop-blur-lg"
                            : ""
                        )}
                      >
                        {label}
                        <VShapedArrowDown
                          strokeWidth={2}
                          className={cn(
                            "transition-transform duration-300 text-foreground-primary/60 ease-out",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                    }
                  />
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    onMouseEnter={() => handleHoverEnter(name)}
                    onMouseLeave={() => handleHoverLeave(name)}
                    className="p-2.5 w-auto min-w-[800px] rounded-2xl bg-primary-foreground/70 backdrop-blur-lg shadow-lg"
                  >
                    {/* Mega-menu layout for Info: two columns */}
                    <div className="grid grid-cols-[1fr_1fr] gap-2.5">
                      {/* Left column: 3 cards */}
                      <div className="flex flex-col gap-2.5">
                        {items.map((item) => (
                          <Link
                            key={item.to}
                            href={item.to as any}
                            onClick={() => setDesktopOpenMenu(null)}
                            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-lg"
                          >
                            <div className="bg-primary-foreground/70 hover:bg-muted transition-colors cursor-pointer rounded-lg border-none shadow-none">
                              <div className="px-4 py-3">
                                <h2 className="text-lg font-semibold text-foreground">
                                  {item.label}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {/* Right column: 1 larger card with image */}
                      <div>
                        <Link
                          href={"/info" as any}
                          onClick={() => setDesktopOpenMenu(null)}
                          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-lg"
                        >
                          <div className="bg-muted/50 hover:bg-muted transition-colors cursor-pointer h-full rounded-lg border-0 shadow-sm">
                            <div className="relative w-full h-48 bg-muted/30 rounded-t-lg mb-4 overflow-hidden">
                              {/* Placeholder for image - replace with actual image */}
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                [Immagine Chi siamo]
                              </div>
                            </div>
                            <div className="px-4 py-3">
                              <h2 className="text-lg font-semibold text-foreground">
                                Chi siamo
                              </h2>
                              <p className="text-sm text-muted-foreground mt-1">
                                Scopri chi siamo e cosa facciamo.
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })()}
        </nav>

        {/* Desktop CTA Button - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <button className="flex px-5 py-2.75 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full font-lg transition-colors hover:bg-primary-foreground/90">
            Parla con noi
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 p-2 rounded-full hover:bg-muted/50 transition-colors"
          aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenuOpen}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Menu className="w-6 h-6 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={handleMobileMenuClose}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.5,
              }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border/40 shadow-xl z-50 md:hidden overflow-y-auto"
              style={{ willChange: "transform" }}
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-6">
                {/* Mobile Navigation Items */}
                <nav className="flex flex-col gap-4">
                  {/* Servizi dropdown */}
                  {(() => {
                    const name = "servizi";
                    const label = "Servizi";
                    const isOpen = mobileOpenCategory === name;
                    const items = menuItems[name as keyof typeof menuItems];

                    return (
                      <div key={name} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileOpenCategory(isOpen ? null : name)
                          }
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors text-left",
                            "hover:bg-muted/50",
                            isOpen && "bg-muted/30"
                          )}
                        >
                          <span className="font-medium text-foreground">
                            {label}
                          </span>
                          <VShapedArrowDown
                            strokeWidth={2}
                            className={cn(
                              "transition-transform duration-300 text-foreground/60 ease-out",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2 pt-2 pb-4 pl-4">
                                {items.map((item) => (
                                  <Link
                                    key={item.to}
                                    href={item.to as any}
                                    onClick={handleMobileMenuClose}
                                    className="block py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="font-medium text-sm text-foreground">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {item.description}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })()}

                  {/* Casi Studio as a simple link */}
                  <Link
                    href="/casi-studio"
                    onClick={handleMobileMenuClose}
                    className="flex items-center w-full py-3 px-4 rounded-lg transition-colors hover:bg-muted/50"
                  >
                    <span className="font-medium text-foreground">
                      Casi Studio
                    </span>
                  </Link>

                  {/* Info dropdown */}
                  {(() => {
                    const name = "info";
                    const label = "Info";
                    const isOpen = mobileOpenCategory === name;
                    const items = menuItems[name as keyof typeof menuItems];

                    return (
                      <div key={name} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileOpenCategory(isOpen ? null : name)
                          }
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors text-left",
                            "hover:bg-muted/50",
                            isOpen && "bg-muted/30"
                          )}
                        >
                          <span className="font-medium text-foreground">
                            {label}
                          </span>
                          <VShapedArrowDown
                            strokeWidth={2}
                            className={cn(
                              "transition-transform duration-300 text-foreground/60 ease-out",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2 pt-2 pb-4 pl-4">
                                {items.map((item) => (
                                  <Link
                                    key={item.to}
                                    href={item.to as any}
                                    onClick={handleMobileMenuClose}
                                    className="block py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="font-medium text-sm text-foreground">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {item.description}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })()}
                </nav>

                {/* Mobile CTA Button */}
                <div className="mt-8 pt-6 border-t border-border/40">
                  <button
                    onClick={handleMobileMenuClose}
                    className="w-full flex items-center justify-center px-5 py-3 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full font-lg transition-colors hover:bg-primary-foreground/90"
                  >
                    Parla con noi
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
