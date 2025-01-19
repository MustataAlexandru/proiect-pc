"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
      >
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
