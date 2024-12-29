import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "./global/Container";
import Navbar from "./navbar/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';
import Footer from "./global/Footer";
import Page from "./posts/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Licenta",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <Container>{children}
              <Page />
            </Container>
          </Providers>
        </body>

      </html>
    </ClerkProvider>
  );
}
