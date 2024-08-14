import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type {ReactNode} from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clear | Cover Letter Engine & Application Review",
  description: "Cover Letter Engine & Application Review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
