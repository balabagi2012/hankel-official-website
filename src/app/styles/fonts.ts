import { Noto_Sans_TC } from "next/font/google";
import localFont from "next/font/local";
const kindergarten = localFont({ src: "./OtomanopeeOne.ttf" });
const notoSans = Noto_Sans_TC({ subsets: ["latin"] });

export { kindergarten, notoSans };
