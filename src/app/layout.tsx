import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlphaTrend - Cross-Chain Market Intelligence",
  description: "Real-time structural analysis of crypto markets across Solana, Base, Ethereum, and BNB. Understand attention, liquidity, and market integrity at a glance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
