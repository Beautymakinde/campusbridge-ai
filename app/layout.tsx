import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusBridge AI — One clear next step",
  description:
    "A guided student support navigator for Illinois Tech students. Find verified help for food, housing, money, transportation, health, immigration, or emergencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <header className="w-full">
          <div className="max-w-5xl mx-auto px-8 py-7 flex items-center justify-between">
            <Link
              href="/"
              className="serif text-[19px] tracking-tight text-[color:var(--color-ink)]"
            >
              CampusBridge<span className="serif-italic"> ai</span>
            </Link>
            <nav className="flex items-center gap-7 text-[14px] text-[color:var(--color-muted)]">
              <Link href="/intake" className="hover:text-[color:var(--color-ink)] transition-colors">
                Find help
              </Link>
              <Link href="/safety" className="hover:text-[color:var(--color-ink)] transition-colors">
                Safety &amp; limits
              </Link>
            </nav>
          </div>
          <div className="divider" />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24">
          <div className="divider" />
          <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px] text-[color:var(--color-muted)]">
            <p>
              Built for the CBC AI Builders Hackathon 2026. Resources verified April 27, 2026.
            </p>
            <p className="serif-italic">Nothing you enter is stored.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
