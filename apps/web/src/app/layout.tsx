import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "Praavi Jobs — Local jobs across Pune", template: "%s | Praavi Jobs" },
  description: "Find trusted local job opportunities and nearby talent across Pune's eastern corridor.",
  metadataBase: new URL("https://jobs.praavi.in"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
