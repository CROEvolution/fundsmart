import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fundsmart · UK SME funding, matched to one lender",
    template: "%s · Fundsmart",
  },
  description:
    "FCA-regulated brokerage. 100+ lenders. One match. Soft credit search only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
