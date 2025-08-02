import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Footer from "@/components/layouts/main/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <title>BA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
