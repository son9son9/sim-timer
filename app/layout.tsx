import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "홀심타이머",
  description: "Holy-Simbol timing assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
