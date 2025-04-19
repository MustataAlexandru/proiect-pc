"use client";

import React from "react";
import { ClerkProvider } from '@clerk/nextjs';

// This component is used to wrap the Clerk provider
// with custom styling and configuration
function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "rgb(239 68 68)", // Red color matching the app theme
          colorText: "currentColor",
        },
        elements: {
          // Minimizing the custom styling to avoid conflicts
          formButtonPrimary:
            "bg-red-500 hover:bg-red-600 text-white",
          card: "shadow-none",
          // Empty string removes default styling
          footer: "",
          footerActionLink: "",
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default AuthProviders;