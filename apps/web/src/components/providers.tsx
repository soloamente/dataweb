"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/utils/trpc";

import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {/* <QueryClientProvider client={queryClient}> */}
      {children}
      {/* <ReactQueryDevtools /> */}
      {/* </QueryClientProvider> */}
      <Toaster richColors />
    </ThemeProvider>
  );
}
