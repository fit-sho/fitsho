import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

// importing header and footer
import { Navbar } from "@/homeSections/Navbar";
import { Footer } from "@/homeSections/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Trainer App",
  description: "A complex trainer app for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-[#EAEEFE] antialiased font-sans"
        )}
      >
        <Navbar /> {/* Adds the navbar */}
        <main> {children} </main>
        <Footer /> {/* Adds the footer */}
      </body>
    </html>
  );
}
