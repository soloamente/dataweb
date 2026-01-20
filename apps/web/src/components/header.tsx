"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Building2,
  CalendarDays,
  Code2,
  Menu,
  Newspaper,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
      label: "Per notai e studi",
      description:
        "Scopri le nostre soluzioni per notai e studi professionali.",
    },
    {
      to: "/servizi/aziende",
      label: "Per aziende",
      description:
        "Scopri le nostre soluzioni per aziende private e pubbliche.",
    },
    {
      to: "/servizi/sviluppo",
      label: "Sviluppo software",
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

// Icon mapping for the desktop mega menu tiles.
// Keep icons large and simple to match the reference style.
const desktopMenuIcons = {
  servizi: [Scale, Building2, Code2],
  info: [Users, Newspaper, CalendarDays],
  // `casi_studio` isn't currently a dropdown, but keep the map exhaustive for type safety.
  casi_studio: [],
} satisfies Record<keyof typeof menuItems, readonly LucideIcon[]>;

export default function Header() {
  // State for desktop dropdown menus
  const [desktopOpenMenu, setDesktopOpenMenu] = useState<string | null>(null);
  // Why the desktop menu opened (used to avoid breaking keyboard focus).
  const [desktopOpenReason, setDesktopOpenReason] = useState<
    "hover" | "intent" | null
  >(null);
  // Keep the dropdown panel centered under the header (not under the trigger).
  // Base UI aligns the popup to the trigger by default; we compute an `alignOffset`
  // that shifts the popup so its center matches the viewport center.
  const [desktopAlignOffset, setDesktopAlignOffset] = useState<{
    servizi: number;
    info: number;
  }>({ servizi: 0, info: 0 });
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
  // Ref to avoid stale state inside setTimeout() closures.
  const desktopOpenMenuRef = useRef<string | null>(null);
  // Ref to avoid stale open reason in event handlers/timeouts.
  const desktopOpenReasonRef = useRef<"hover" | "intent" | null>(null);
  // Trigger refs: used to blur the trigger after hover-close to avoid “tab-like” focus rings.
  const serviziTriggerRef = useRef<HTMLButtonElement | null>(null);
  const infoTriggerRef = useRef<HTMLButtonElement | null>(null);
  // Only enable hover-open on pointer devices. This prevents “sticky hover” on touch.
  const [isFinePointer, setIsFinePointer] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { name: "servizi", label: "Servizi" },
    { name: "info", label: "Info" },
  ] as const;

  // Keep a ref in sync so delayed close logic can safely “double-check” the current open menu.
  useEffect(() => {
    desktopOpenMenuRef.current = desktopOpenMenu;
  }, [desktopOpenMenu]);

  // Keep a ref in sync so hover handlers can respect how the menu was opened.
  useEffect(() => {
    desktopOpenReasonRef.current = desktopOpenReason;
  }, [desktopOpenReason]);

  // Blur helper: only used after hover-close to prevent focus rings that look like Tab navigation.
  const blurTriggerAfterHoverClose = (menuName: string) => {
    const trigger =
      menuName === "servizi" ? serviziTriggerRef.current : infoTriggerRef.current;

    if (!trigger) return;

    const blurIfFocused = () => {
      if (document.activeElement === trigger) {
        trigger.blur();
      }
    };

    // Base UI may restore focus asynchronously, so try a few times.
    blurIfFocused();
    setTimeout(blurIfFocused, 0);
    setTimeout(blurIfFocused, 10);
    setTimeout(blurIfFocused, 50);
    setTimeout(blurIfFocused, 120);
    setTimeout(blurIfFocused, 250);
  };

  // Compute the X offset needed to center the dropdown under the page/header.
  const updateDesktopAlignOffset = (menuName: "servizi" | "info") => {
    // Note: these triggers are inside a fixed header, so their bounding rect is stable.
    const trigger =
      menuName === "servizi" ? serviziTriggerRef.current : infoTriggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const triggerCenterX = rect.left + rect.width / 2;
    const viewportCenterX = window.innerWidth / 2;
    const offset = viewportCenterX - triggerCenterX;

    setDesktopAlignOffset((prev) => ({ ...prev, [menuName]: offset }));
  };

  // When a desktop menu is open, keep it centered on resize.
  useEffect(() => {
    if (!desktopOpenMenu) return;
    if (desktopOpenMenu !== "servizi" && desktopOpenMenu !== "info") return;

    const handleResize = () => updateDesktopAlignOffset(desktopOpenMenu);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopOpenMenu]);

  // Detect whether hover interactions should be enabled (pointer: fine + hover: hover).
  // This is important to avoid hover behavior on touch devices.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsFinePointer(mql.matches);

    update();

    // Support both modern and legacy MediaQueryList APIs.
    // TS types in modern DOM libs don't include `addListener/removeListener`,
    // so we use a narrow cast only for the legacy fallback.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    const legacyMql = mql as unknown as {
      addListener: (listener: () => void) => void;
      removeListener: (listener: () => void) => void;
    };

    legacyMql.addListener(update);
    return () => legacyMql.removeListener(update);
  }, []);

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
    if (!isFinePointer) return;

    // Keep the dropdown centered under the header/page.
    if (menuName === "servizi" || menuName === "info") {
      updateDesktopAlignOffset(menuName);
    }

    // Clear any pending close timeout immediately
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // IMPORTANT: Blur the trigger if it has focus before hover-opening.
    // After browser navigation (back button), the trigger might retain focus from
    // before navigation. If we hover-open while the trigger is focused, Base UI's
    // internal focus management can conflict and immediately close the menu.
    const trigger =
      menuName === "servizi" ? serviziTriggerRef.current : infoTriggerRef.current;
    if (trigger && document.activeElement === trigger) {
      trigger.blur();
    }

    // Immediately open the new menu (this will close any previously open menu)
    setDesktopOpenReason("hover");
    setDesktopOpenMenu(menuName);
  };

  // Handle hover leave for desktop dropdowns
  const handleHoverLeave = (menuName: string) => {
    if (!isFinePointer) return;
    // If the user opened the menu via click/keyboard, don't auto-close on hover leave.
    // This keeps “intent” interactions predictable and avoids fighting the pointer.
    if (desktopOpenReasonRef.current !== "hover") return;

    // Only close if we're leaving the currently open menu
    // This prevents closing when moving between nav items
    if (desktopOpenMenuRef.current === menuName) {
      // Add a small delay before closing to allow moving to the dropdown content
      closeTimeoutRef.current = setTimeout(() => {
        // Double-check the *current* open menu before closing (avoid stale state bugs).
        if (desktopOpenMenuRef.current === menuName) {
          setDesktopOpenMenu(null);
          setDesktopOpenReason(null);
          // Prevent “tab-like” focus outline after hover-close.
          blurTriggerAfterHoverClose(menuName);
        }
        closeTimeoutRef.current = null;
      }, 120); // Small delay to allow smooth transition to dropdown content
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
    // IMPORTANT: Only remove focus when opened via hover on fine pointers.
    // For keyboard/click (“intent”), we must not blur or we break accessibility.
    if (desktopOpenMenu && desktopOpenReason === "hover" && isFinePointer) {
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
  }, [desktopOpenMenu, desktopOpenReason, isFinePointer]);

  // Close mobile menu when clicking outside or on a link
  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setDesktopOpenMenu(null);
    setMobileOpenCategory(null);
  };

  return (
    <>
    <header
      className="fixed top-4 z-450 right-0 rounded-full! left-0 mx-4 md:mx-auto container flex items-start justify-between py-2 lg:items-center text-off-white hero-fade-in"
      style={{
        width: isScrolled ? "auto" : "90%",
        borderRadius: isScrolled ? "50px" : "24px",
        paddingLeft: "12px",
        paddingRight: "10px",
        "--figma-blur": "25.5px",
        "--figma-brightness": "1.04",
        "--figma-contrast": "1.075",
        "--figma-bg": "rgba(255, 255, 255, 0.1)",
        "--figma-border": "1px solid rgba(255, 255, 255, 0.1)",
        "--figma-shadow":
          "0 7.5px 30px rgba(0, 0, 0, 0.045), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        "--figma-border-radius": "24px",
        backdropFilter:
          "blur(var(--figma-blur)) brightness(var(--figma-brightness)) contrast(var(--figma-contrast))",
        background: "var(--figma-bg)",
        border: "var(--figma-border)",
        boxShadow: "var(--figma-shadow)",
        overflow: "hidden",
        transform: "translateZ(0px)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        willChange: "backdrop-filter, background, border, box-shadow, opacity, transform, width",
        contain: "layout style paint",
        isolation: "isolate",
        WebkitFontSmoothing: "antialiased",
      } as React.CSSProperties}
    >
      {/* Logo Button */}
      <Link
        href="/"
        aria-label="Homepage"
        className="relative flex cursor-pointer flex-row items-center justify-center pt-0.5 lg:pt-0 gap-2"
      >
        {/* Logo Image */}
        <Image
          src="/images/logos/logo_positivo.png"
          alt="Dataweb"
          width={100}
          height={100}
          className="h-8.5 w-auto"
        />
        {/* DataWeb text */}
        <span className="hidden md:block text-primary-foreground font-medium text-lg leading-none tracking-[-0.00875em] overflow-hidden whitespace-nowrap">
          Dataweb
        </span>
       </Link>

      {/* Desktop Navigation - hidden on mobile */}
      <nav className="hidden items-center gap-4 md:gap-4 lg:flex xl:gap-12 overflow-hidden">
        {/* Servizi dropdown */}
        {(() => {
          const name = "servizi";
          const label = "Servizi";
          const isOpen = desktopOpenMenu === name;
          const items = menuItems[name as keyof typeof menuItems];

          return (
            <div
              key={name}
              onPointerEnter={() => handleHoverEnter(name)}
              onPointerLeave={() => handleHoverLeave(name)}
              className="relative"
            >
              <DropdownMenu
                open={isOpen}
                onOpenChange={(open) => {
                  // Base UI toggles open state on click/keyboard; since we control `open`,
                  // we must mirror it back into `desktopOpenMenu`.
                  if (open) {
                    updateDesktopAlignOffset(name);
                    // Only set reason to "intent" if not already set by hover handler.
                    // This preserves hover behavior when Base UI fires onOpenChange after
                    // we programmatically opened the menu via hover.
                    if (desktopOpenReasonRef.current !== "hover") {
                      setDesktopOpenReason("intent");
                    }
                    setDesktopOpenMenu(name);
                    return;
                  }

                  // Only close if we're not in a hover-controlled scenario.
                  // Hover close is handled by handleHoverLeave with its own timing.
                  if (desktopOpenReasonRef.current !== "hover") {
                    setDesktopOpenMenu(null);
                    setDesktopOpenReason(null);
                  }
                }}
              >
                <DropdownMenuTrigger
                  render={
                    <button
                      ref={serviziTriggerRef}
                      type="button"
                      className={cn(
                        // Remove default browser focus outline; re-introduce a visible ring only for keyboard users.
                        "ease-until flex items-center gap-2 cursor-pointer text-primary-foreground duration-until leading-none font-medium tracking-[-0.00875em] transition-all hover:text-off-white/50! hover:text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md",
                          isOpen && "text-primary-foreground/50"
                      )}
                    >
                      {label} <VShapedArrowDown strokeWidth={2.5} className="text-primary-foreground/50"/>
                    </button>
                  }
                />
                <DropdownMenuContent
                  align="center"
                  alignOffset={desktopAlignOffset.servizi}
                  // Add breathing room so the dropdown doesn't overlap the fixed header.
                  sideOffset={24}
                  // Keep hover-open stable when moving between trigger and panel.
                  onPointerEnter={() => handleHoverEnter(name)}
                  onPointerLeave={() => handleHoverLeave(name)}
                  // Disable Base UI's built-in CSS animations for this menu to avoid double animations
                  // (we animate the panel with Motion below).
                  className="data-open:animate-none data-closed:animate-none w-[900px] max-w-[90vw] rounded-3xl bg-primary-foreground/85 backdrop-blur-lg shadow-lg ring-1 ring-foreground/10"
                  // Entrance animation (≤200ms) with reduced-motion support.
                  render={
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, transform: "none" }
                          : { opacity: 0, transform: "translateY(4px) scale(0.98)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.18, ease: "easeOut" }
                      }
                      style={{ willChange: shouldReduceMotion ? undefined : "transform" }}
                    />
                  }
                >
                  <div className="p-1">
                    {/* Dropdown header (matches “API Documentation” style) */}
                    <div className="px-5 py-5">
                      <div className="text-base font-semibold text-foreground leading-none">
                        {label}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Scopri le nostre soluzioni e scegli quella giusta per te.
                      </p>
                    </div>

                    {/* Content tiles: square containers with big icon + label + description */}
                    {/* Match reference: one unified grid with subtle dividers (no per-card gaps). */}
                    <div className="">
                      <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-3xl border border-foreground/10 bg-primary-foreground/55">
                        {items.map((item, idx) => (
                        <Link
                          key={item.to}
                          href={item.to as any}
                          onClick={() => {
                            // Reset both menu state and reason when navigating away.
                            // This ensures clean state when returning via browser back button.
                            setDesktopOpenMenu(null);
                            setDesktopOpenReason(null);
                          }}
                          className={cn(
                            // Focus ring for keyboard users only (matches the rest of the nav behavior)
                            "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                            // Dividers: right border for all but last column.
                            idx % 3 !== 2 && "border-r border-foreground/10",
                          )}
                        >
                          <div className="aspect-square p-4 transition-colors duration-200 ease-out group-hover:bg-primary-foreground/70">
                            {(() => {
                              const Icon =
                                desktopMenuIcons.servizi[idx] ?? desktopMenuIcons.servizi[0];
                              return (
                                <div className="flex h-full flex-col items-start text-left">
                                  {/* Large icon, like the reference tiles */}
                                  <div className="flex h-full flex-1 w-full items-center justify-center">
                                    <Icon
                                      className="text-muted-foreground size-20"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="flex flex-0 flex-col items-start text-left gap-1.5">
                                  <div className="mt-4 text-base font-medium text-foreground leading-none">
                                    {item.label}
                                  </div>
                                  <div className=" text-sm text-muted-foreground">
                                    {item.description}
                                  </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })()}

        {/* Casi Studio as a simple link */}
        <Link
          href="/casi-studio"
          className="ease-until text-primary-foreground duration-until leading-none font-medium tracking-[-0.00875em] transition-all hover:text-off-white/50"
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
              onPointerEnter={() => handleHoverEnter(name)}
              onPointerLeave={() => handleHoverLeave(name)}
              className="relative"
            >
              <DropdownMenu
                open={isOpen}
                onOpenChange={(open) => {
                  // Base UI toggles open state on click/keyboard; since we control `open`,
                  // we must mirror it back into `desktopOpenMenu`.
                  if (open) {
                    updateDesktopAlignOffset(name);
                    // Only set reason to "intent" if not already set by hover handler.
                    // This preserves hover behavior when Base UI fires onOpenChange after
                    // we programmatically opened the menu via hover.
                    if (desktopOpenReasonRef.current !== "hover") {
                      setDesktopOpenReason("intent");
                    }
                    setDesktopOpenMenu(name);
                    return;
                  }

                  // Only close if we're not in a hover-controlled scenario.
                  // Hover close is handled by handleHoverLeave with its own timing.
                  if (desktopOpenReasonRef.current !== "hover") {
                    setDesktopOpenMenu(null);
                    setDesktopOpenReason(null);
                  }
                }}
              >
                <DropdownMenuTrigger
                  render={
                    <button
                      ref={infoTriggerRef}
                      type="button"
                      className={cn(
                        // Remove default browser focus outline; re-introduce a visible ring only for keyboard users.
                        "ease-until flex items-center gap-2 cursor-pointer text-primary-foreground duration-until leading-none font-medium tracking-[-0.00875em] transition-all hover:text-off-white/50! hover:text-off-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md",
                        isOpen && "text-primary-foreground/50"
                      )}
                    >
                      {label}  <VShapedArrowDown strokeWidth={2.5} className="text-primary-foreground/50"/>
                    </button>
                  }
                />
                <DropdownMenuContent
                  align="center"
                  alignOffset={desktopAlignOffset.info}
                  // Add breathing room so the dropdown doesn't overlap the fixed header.
                  sideOffset={24}
                  // Keep hover-open stable when moving between trigger and panel.
                  onPointerEnter={() => handleHoverEnter(name)}
                  onPointerLeave={() => handleHoverLeave(name)}
                  // Disable Base UI's built-in CSS animations for this menu to avoid double animations
                  // (we animate the panel with Motion below).
                  className="data-open:animate-none data-closed:animate-none w-[900px] max-w-[90vw] rounded-3xl bg-primary-foreground/85 backdrop-blur-lg shadow-lg ring-1 ring-foreground/10"
                  // Entrance animation (≤200ms) with reduced-motion support.
                  render={
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, transform: "none" }
                          : { opacity: 0, transform: "translateY(4px) scale(0.98)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.18, ease: "easeOut" }
                      }
                      style={{ willChange: shouldReduceMotion ? undefined : "transform" }}
                    />
                  }
                >
                  <div className="p-1">
                    {/* Dropdown header (matches the reference layout) */}
                    <div className="px-5 py-5">
                      <div className="text-base font-semibold text-foreground leading-none">
                        {label}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground leading-none">
                        Approfondisci DataWeb: chi siamo, novità e prossimi eventi.
                      </p>
                    </div>

                    <div className="">
                      <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-3xl border border-foreground/10 bg-primary-foreground/55">
                        {items.map((item, idx) => (
                        <Link
                          key={item.to}
                          href={item.to as any}
                          onClick={() => {
                            // Reset both menu state and reason when navigating away.
                            // This ensures clean state when returning via browser back button.
                            setDesktopOpenMenu(null);
                            setDesktopOpenReason(null);
                          }}
                          className={cn(
                            // Focus ring for keyboard users only (matches the rest of the nav behavior)
                            "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                            // Dividers: right border for all but last column.
                            idx % 3 !== 2 && "border-r border-foreground/10",
                          )}
                        >
                          <div className="aspect-square p-4 transition-colors duration-200 ease-out group-hover:bg-primary-foreground/70">
                            {(() => {
                              const Icon = desktopMenuIcons.info[idx] ?? desktopMenuIcons.info[0];
                              return (
                                <div className="flex h-full flex-col items-start text-left">
                                  <div className="flex h-full flex-1 w-full items-center justify-center">
                                    <Icon
                                      className="text-muted-foreground size-20"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="flex flex-0 flex-col items-start text-left gap-1.5">
                                  <div className="mt-4 text-base font-medium text-foreground leading-none">
                                    {item.label}
                                  </div>
                                    <div className=" text-sm text-muted-foreground">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })()}
        </nav>

      {/* Join Us Button */}
      <Link
        href={"/contact" as any}
        className=""
      >
        {/* Fix: stray whitespace in the tag name would break JSX parsing. */}
        <span
          className="inline-flex hover:bg-primary! hover:text-primary-foreground! items-center justify-center group font-medium whitespace-nowrap rounded-full transition-all duration-until ease-until cursor-pointer ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:brightness-110 group-hover:brightness-110 shadow-until text-off-black hover:bg-off-black hover:text-off-white px-8 py-2.75 relative z-10 leading-none"
          style={{
            background: "radial-gradient(50% 100% at 50% 100%, rgba(190, 190, 190, 0.30) 0%, rgba(190, 190, 190, 0.00) 100%), #F7F3EC"
          }}
        >
          Parla con noi
        </span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="z-100 mx-2 mt-2 flex w-fit items-center justify-center lg:hidden relative isolate after:absolute after:-inset-2 after:content-[''] touch-action-manipulation focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Open navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span
          className="flex h-5 w-[22px] origin-center flex-col items-center justify-center space-y-1.5"
          aria-hidden="true"
        >
          <span className="hamburger-line h-0.5 w-full rounded-full bg-current"></span>
          <span className="hamburger-line h-0.5 w-full rounded-full bg-current"></span>
          <span className="hamburger-line h-0.5 w-full rounded-full bg-current"></span>
        </span>
      </button>

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: "0px",
          // Gradient overlay with darker tones throughout
          background:
            "linear-gradient(45deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 25%, rgba(0, 0, 0, 0.16) 50%, rgba(0, 0, 0, 0.16) 75%, rgba(0, 0, 0, 0.16) 100%)",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          borderRadius: isScrolled ? "50px" : "24px",
          overflow: "hidden",
        }}
      />
      {/* Gradient Overlay (duplicate layer for a stronger effect) */}
      {/* <div
        style={{
          position: "absolute",
          inset: "0px",
          background:
            "linear-gradient(45deg, rgba(0, 0, 0, 0.16) 0%, rgba(255, 255, 255, 0.24) 25%, rgba(0, 0, 0, 0.16) 50%, transparent 75%, rgba(0, 0, 0, 0.16) 100%)",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          borderRadius: isScrolled ? "50px" : "24px",
          overflow: "hidden",
        }}
      /> */}
    </header>

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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[500] lg:hidden"
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
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background border-l border-border/40 shadow-xl z-[500] lg:hidden overflow-y-auto"
              style={{ willChange: "transform" }}
              id="mobile-menu"
            >
              <div className="flex flex-col h-full pt-24 px-6 pb-6">
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
                    className="w-full flex items-center justify-center px-5 py-3 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full transition-colors hover:bg-primary-foreground/90"
                  >
                    Parla con noi
                  </button>
                  </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
