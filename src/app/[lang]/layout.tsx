import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.scss";
import { notoSans } from "@/app/styles/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon/logo_square.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
      </head>
      <body className={notoSans.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
