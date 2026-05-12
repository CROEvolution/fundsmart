import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fundsmart · Get matched to one lender",
  description:
    "Bank said no to your £50k+? In 2 minutes, we find the 1 lender most likely to say yes. Soft search only. No cowboys.",
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
