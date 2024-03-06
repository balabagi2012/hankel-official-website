import { notoSans } from "@/app/styles/fonts";
import "@/app/styles/globals.scss";
import "animate.css";
import dynamic from "next/dynamic";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function RootLayout({
  params: { lang },
  children,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "zh" };
}) {
  return (
    <html lang={lang === "en" ? "en" : "zh-tw"}>
      <head>
        <link rel="icon" href="/uploads/favicon.ico" sizes="24x24" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className={notoSans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
